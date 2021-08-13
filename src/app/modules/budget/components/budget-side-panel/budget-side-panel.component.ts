import { Component, OnInit, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BudgetTypeTreeNode } from 'src/app/shared/models/BudgetTypeTreeNode';

@Component({
  selector: 'app-budget-side-panel',
  templateUrl: './budget-side-panel.component.html',
  styleUrls: ['./budget-side-panel.component.scss']
})
export class BudgetSidePanelComponent implements OnInit {

  @Input() budgetTypeTreeNode: BudgetTypeTreeNode[];

  treeControl = new NestedTreeControl<BudgetTypeTreeNode>(node => node.children);

  dataSource = new MatTreeNestedDataSource<BudgetTypeTreeNode>();

  constructor() {
    this.dataSource.data = this.budgetTypeTreeNode;
  }

  ngOnInit() {
    this.dataSource.data = this.budgetTypeTreeNode;
  }

}
