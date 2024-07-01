import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';

import { NodeService } from './test.service';
//import { MessageService, TreeNode, TreeTableNode } from 'primeng/api';

import { MessageService, TreeNode } from 'primeng/api';

import { TreeTableModule } from 'primeng/treetable';
//import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
//import { TreeTableModule } from 'primeng/treetable';
//import { TreeNode } from 'primeng/primeng';

interface Column {
  field: string;
  header: string;
}

interface NodeEvent {
  originalEvent: Event;
  node: TreeNode;
}

@Component({
  standalone: true,
  imports: [CommonModule, TreeTableModule, ToastModule,CheckboxModule,
    TreeSelectModule,ButtonModule,TreeModule],
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [NodeService, MessageService]
})
export class TestComponent implements OnInit {

  @Input() id: string | undefined;

  @Input() title: string | undefined;

  // @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

  files!: TreeNode[];

  selectedFiles!: TreeNode[];
  //selectedNode!: TreeNode;

  // selectedNode: TreeNode | null = null;
  // selectedNode: TreeNode<any> | null = null;

  selectionKeys = {};

  cols!: Column[];

  constructor(private nodeService: NodeService
    //, private cd: ChangeDetectorRef, private messageService: MessageService
  ) { }

  ngOnInit() {
    this.nodeService.getTreeTableNodes().then((files) => {
      this.files = files;
      // this.cd.markForCheck();
    });

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];

    this.selectionKeys = {
      '0-0': {
        partialChecked: false,
        checked: true
      }
    };
  }

  expandAll() {
    this.files.forEach((node) => {
        this.expandRecursive(node, true);
    });
}

collapseAll() {
    this.files.forEach((node) => {
        this.expandRecursive(node, false);
    });
}

private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
        node.children.forEach((childNode) => {
            this.expandRecursive(childNode, isExpand);
        });
    }
}

  // nodeSelect(event: NodeEvent) {
  //   console.log(event);
  //   this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
  // }

  // nodeUnselect(event: NodeEvent) {
  //   this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.name });
  // }

}
