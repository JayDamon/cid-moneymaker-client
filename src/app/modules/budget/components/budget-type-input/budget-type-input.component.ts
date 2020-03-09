import { element } from 'protractor';
import { Budget } from 'src/app/shared/models/Budget';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { BudgetItem } from 'src/app/shared/models/BudgetItem';
import { BehaviorSubject } from 'rxjs';
import { BudgetCategory } from 'src/app/shared/models/BudgetCategory';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Input, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { BudgetType } from 'src/app/shared/models/BudgetType';
import { TransactionBudgetCategory } from 'src/app/shared/models/TransactionBudgetCategory';

/**
 * Node for to-do item
 */
export class BudgetCategoryNode {
  children: BudgetCategoryNode[];
  budgetCategory: BudgetCategory;
  budgetItem: BudgetItem;
  budgetType: BudgetType;
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class BudgetCategoryFlatNode {
  item: string;
  level: number;
  budget: Budget;
  expandable: boolean;
}

@Component({
  selector: 'app-budget-type-input',
  templateUrl: './budget-type-input.component.html',
  styleUrls: ['./budget-type-input.component.scss']
})
export class BudgetTypeInputComponent implements OnInit {

  @Input() budgetType: BudgetType;

  budgets: Array<Budget> = [];

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<BudgetCategoryFlatNode, BudgetCategoryNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<BudgetCategoryNode, BudgetCategoryFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: BudgetCategoryFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<BudgetCategoryFlatNode>;

  treeFlattener: MatTreeFlattener<BudgetCategoryNode, BudgetCategoryFlatNode>;

  dataSource: MatTreeFlatDataSource<BudgetCategoryNode, BudgetCategoryFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<BudgetCategoryFlatNode>(true /* multiple */);

  constructor(private budgetService: BudgetService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<BudgetCategoryFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
    })

    this.budgetService.getBudgets().subscribe((budgets: Array<Budget>) => {
      this.budgets = budgets;
    })

  }

  ngOnInit(): void {
    this.dataSource.data = this.buildFileTree(this.budgetType);
    this.dataChange.next(this.dataSource.data);
  }

  buildFileTree(budgetType: BudgetType): BudgetCategoryNode[] {

    let nodes: BudgetCategoryNode[] = [];

    if (budgetType.budgetCategories) {
      for (let category of budgetType.budgetCategories) {
        const node = new BudgetCategoryNode();
        node.item = category.name;
        node.children = [];
        for (let item of category.budgetItems) {
          const childNode = new BudgetCategoryNode();
          childNode.budgetItem = item;
          childNode.item = item.name;
          childNode.budgetCategory = category;
          childNode.budgetType = budgetType;
          node.children.push(childNode);
        }
        nodes.push(node);
      }
    }

    return nodes;

  }
      
    getLevel = (node: BudgetCategoryFlatNode) => node.level;
  
    isExpandable = (node: BudgetCategoryFlatNode) => node.expandable;
  
    getChildren = (node: BudgetCategoryNode): BudgetCategoryNode[] => node.children;
  
    hasChild = (_: number, _nodeData: BudgetCategoryFlatNode) => _nodeData.expandable;
  
    hasNoContent = (_: number, _nodeData: BudgetCategoryFlatNode) => _nodeData.item === '';
  
    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: BudgetCategoryNode, level: number) => {
      const existingNode = this.nestedNodeMap.get(node);
      const flatNode = existingNode && existingNode.item === node.item
          ? existingNode
          : new BudgetCategoryFlatNode();

      if (level > 0) {
        let budget = this.categoryNodeToBudget(node);
        flatNode.budget = budget;
      }

      flatNode.item = node.item;
      flatNode.level = level;
      flatNode.expandable = !!node.children;
      this.flatNodeMap.set(flatNode, node);
      this.nestedNodeMap.set(node, flatNode);
      return flatNode;
    }
  
    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: BudgetCategoryFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      const descAllSelected = descendants.every(child =>
        this.checklistSelection.isSelected(child)
      );
      return descAllSelected;
    }
  
    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: BudgetCategoryFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      const result = descendants.some(child => this.checklistSelection.isSelected(child));
      return result && !this.descendantsAllSelected(node);
    }
  
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    budgetItemSelectionToggle(node: BudgetCategoryFlatNode): void {
      this.checklistSelection.toggle(node);
      const descendants = this.treeControl.getDescendants(node);
      if (this.checklistSelection.isSelected(node)) {
        this.checklistSelection.select(...descendants);
        descendants.forEach(descendant => {
          this.budgetService.addBudget(descendant.budget);
          // this.budgets.push(descendant.budget);
        });
      } else {
        this.checklistSelection.deselect(...descendants);
        descendants.forEach(descendant => {
          this.budgetService.removeBudget(descendant.budget);
          // let budgetIndex = this.budgets.indexOf(descendant.budget);
          // if(budgetIndex !== -1) {
          //   this.budgets.splice(budgetIndex, 1);
          // }
        });
      }

      // Force update for the parent
      descendants.every(child => 
          this.checklistSelection.isSelected(child)        
      );
      this.checkAllParentsSelection(node);

    }
  
    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    budgetLeafItemSelectionToggle(node: BudgetCategoryFlatNode): void {
      this.checklistSelection.toggle(node);
      this.checkAllParentsSelection(node);
      if (this.checklistSelection.isSelected(node)) {
        this.budgetService.addBudget(node.budget);
      } else {
        this.budgetService.removeBudget(node.budget);
      }
    }
  
    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: BudgetCategoryFlatNode): void {
      let parent: BudgetCategoryFlatNode | null = this.getParentNode(node);
      while (parent) {
        this.checkRootNodeSelection(parent);
        parent = this.getParentNode(parent);
      }
    }
  
    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: BudgetCategoryFlatNode): void {
      const nodeSelected = this.checklistSelection.isSelected(node);
      const descendants = this.treeControl.getDescendants(node);
      const descAllSelected = descendants.every(child =>
        this.checklistSelection.isSelected(child)
      );
      if (nodeSelected && !descAllSelected) {
        this.checklistSelection.deselect(node);
      } else if (!nodeSelected && descAllSelected) {
        this.checklistSelection.select(node);
      }
    }
  
    /* Get the parent node of a node */
    getParentNode(node: BudgetCategoryFlatNode): BudgetCategoryFlatNode | null {
      const currentLevel = this.getLevel(node);
  
      if (currentLevel < 1) {
        return null;
      }
  
      const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
  
      for (let i = startIndex; i >= 0; i--) {
        const currentNode = this.treeControl.dataNodes[i];
  
        if (this.getLevel(currentNode) < currentLevel) {
          return currentNode;
        }
      }
      return null;
    }

    addNewItem(node: BudgetCategoryFlatNode) {
      const parentNode = this.flatNodeMap.get(node);
      this.insertItem(parentNode!, '');
      this.treeControl.expand(node);
    }

    dataChange = new BehaviorSubject<BudgetCategoryNode[]>([]);

    get data(): BudgetCategoryNode[] {
      return this.dataChange.value;
    }

    insertItem(parent: BudgetCategoryNode, name: string) {
      if (parent.children) {
        let singleChild: BudgetCategoryNode = parent.children[0];
        parent.children.push( 
          {
            item: name, 
            budgetItem: {category: singleChild.budgetItem.category, name: name},
            budgetCategory: singleChild.budgetCategory, 
            budgetType: singleChild.budgetType
          } as BudgetCategoryNode);
        this.dataChange.next(this.data);
      }
    }

    // finalizeBudgets() {
    //   this.createBudgets();
    //   this.budgetService.saveNewBudgets(this.budgets);
    // }

    createBudgets() {
      let nodes: BudgetCategoryNode[] = this.data;
      
      for (let categoryNode of nodes) {
        for (let itemNode of categoryNode.children) {
          let budget = this.categoryNodeToBudget(itemNode);
          this.budgets.push(budget);
        }
      }
    }

    categoryNodeToBudget(itemNode: BudgetCategoryNode): Budget {
      
        let item: BudgetItem = itemNode.budgetItem;

        let budget: Budget;
        if (itemNode.budgetCategory != null) {
          budget = this.createBudget(
            itemNode.budgetCategory.id, itemNode.budgetType.type, item.category, itemNode.budgetItem.name);
        } else {
          budget = this.createBudget(null, null, null, null);
        }
        return budget;
              
    }

    createBudget(cateogoryId: number, budgetType: string, categoryName: string, itemName: string): Budget {
      let budgetCategory = <TransactionBudgetCategory> {
        id: cateogoryId,
        name: budgetType + " " + categoryName
      }
      let budget = <Budget> {
        name: itemName,
        budgetCategory: budgetCategory
      }
      return budget;
    }

    convertBudgetTypeToBudget(budgetItem: BudgetItem) {
      const budgetCategory = <TransactionBudgetCategory> {
        name: budgetItem.category
      }
      const budget = <Budget>{
        name: budgetItem.name,
        budgetCategory: budgetCategory
      }
      return budget;
    }

    updateItem(node: BudgetCategoryNode, name: string) {
      node.item = name;
      node.budgetItem.name = name;
      this.dataChange.next(this.data);
    }

    saveNode(node: BudgetCategoryFlatNode, itemValue: string) {
      const nestedNode = this.flatNodeMap.get(node);
      this.updateItem(nestedNode!, itemValue);
    }

}
