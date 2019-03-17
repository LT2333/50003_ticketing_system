//
//  ProcTreeDPCoinChangeProblem.c
//  CSE_CCodes
//
//  Created by Natalie Agus on 4/1/19.
//  Copyright © 2019 Natalie Agus. All rights reserved.
//

#include "ProcTreeDPCoinChangeProblem.h"

/*
   Entry function. DO NOT CHANGE THIS FUNCTION
 */
void getCoinChangeCombination_test(int* coinSupplyValue, int value, int coinTypes, methodType method){

        //allocate memory for (value+1) * coinTypes ProcessTreeNode struct (each represents a cell in the DP table)
        //create (value+1) * coinTypes ProcessTreeNode structs (each represents a cell in the DP table)
        int totalNodes = (value+1) * coinTypes;
        ProcessTreeNode nodesDP[totalNodes];

        int counter = 0;
        for(int i = 0; i<(coinTypes); i++) {
                for (int j = 0; j<(value+1); j++) {
                        initProcessTreeNode(&nodesDP[counter], j, i+1, counter, totalNodes, 0);
                        counter++;
                }
        }

        //assert the total number of nodes created is the same as totalNodes
        assert(totalNodes == counter);

        //link children and parents to each node
        linkRelationshipProcessTreeNode(nodesDP, coinSupplyValue, value, coinTypes);


        switch (method) {
        case (USESEQUENTIAL):
                runFunctionSequentialMethod_Create(nodesDP);
                break;
        case (USETHREAD):
                runFunctionThreadMethod_Create(nodesDP);
                break;
        case (USEPROCESS):
        {
                int forkReturnVal = fork();
                if (forkReturnVal == 0)
                        runFunctionProcessMethod_Create(nodesDP);
                else{
                        wait(NULL);
                }
                break;
        }
        }

        printTreeForDebugging(nodesDP, counter);
}

void initProcessTreeNode(ProcessTreeNode* P, int value, int coinTypes, int number, int totalNodes, int initVal){
        P->numberOfParents = 0;
        P->numberOfChildren = 0;
        P->nodeNumber = number;
        sprintf(P->name, "S%dV%d", coinTypes, value);
        P->totalNumberOfNodes = totalNodes;
        P->cellValue = initVal;
        P->processStatus = UNDEFINED;
}

void printTreeForDebugging(ProcessTreeNode* nodesDP, int items){
        //try printing their names and children, as well as parents,
        //to see if they have been created correctly
        printf("Total number of nodes is %d \n", items);
        for (int i = 0; i<items; i++) {
                printf("\nNode number %d with name: %s ", nodesDP[i].nodeNumber, nodesDP[i].name);
                printf("has %d children. The children are: ", nodesDP[i].numberOfChildren);
                for (int j = 0; j < nodesDP[i].numberOfChildren; j++) {
                        printf("%s, ", nodesDP[i].children[j]->name);
                }
                printf("and has %d parents. The parents are: ", nodesDP[i].numberOfParents);
                for (int j = 0; j < nodesDP[i].numberOfParents; j++) {
                        printf("%s, ", nodesDP[i].parents[j]->name);
                }
                printf("\nThe value of this node is: %d ", nodesDP[i].cellValue);
                printf("\n\n");

        }
}


/**
   Part 2
   @param int* coinSupplyValue: gives the denomination of coins (unlimited supply for each denomination)
   @param int value: that you want to make up using the coins
   @param int cointTypes: the total size of array coinSupplyValue (how many different coin types are there)
 **/

void linkRelationshipProcessTreeNode(ProcessTreeNode* nodesDP, int* coinSupplyValue, int value, int coinTypes)
{
        /** Your code here **/
        /* This question will be done in 2 parts.
           Part A: Compute the children of a particular node
           Part B: Compute the parents of a particular node
           Consider the table in Figure 3, we will iterate through each cell in the table
           There are nodes with no children, nodes with one child and nodes with 2 children
           There are nodes with 2 parents, 1 parent and no parents
           We count nodes starting from 0 (Top left of the table) from left to right and then top to bottom.
         */

        // PART A Settle the children
        int nodeNum = 0;
        for(int row=1; row<=coinTypes; row++) {
                for(int col=0; col<=value; col++) {
                        // First row the children depend on the value of the coin
                        // First row does not have a row above to look at
                        if(row==1) {
                                if(col<coinSupplyValue[row-1]) {
                                        // no child
                                        nodesDP[nodeNum].numberOfChildren = 0;
                                        nodeNum++;
                                } else{
                                        // one child
                                        nodesDP[nodeNum].numberOfChildren = 1;
                                        // Link to the child
                                        nodesDP[nodeNum].children[0] = &nodesDP[nodeNum - coinSupplyValue[row-1]];
                                        nodeNum++;
                                }
                        } // subsequent rows always have to look up (At least one child). some look left
                        else{
                                if(col<coinSupplyValue[row-1]) {
                                        // one child (Look up)
                                        nodesDP[nodeNum].numberOfChildren = 1;
                                        nodesDP[nodeNum].children[0] = &nodesDP[nodeNum - value -1]; // look above
                                        nodeNum++;
                                } else{
                                        // Two children
                                        nodesDP[nodeNum].numberOfChildren = 2;
                                        nodesDP[nodeNum].children[0] = &nodesDP[nodeNum - value -1]; // look above
                                        nodesDP[nodeNum].children[1] = &nodesDP[nodeNum - coinSupplyValue[row-1]];
                                        nodeNum++;
                                }
                        }
                }
        }

        // PART B Settle the parents start from the back
        int nodeNumLast = (value + 1) * coinTypes - 1;
        //parents
        for (int row=coinTypes; row>=1; row--) {
                for(int col=value; col>=0; col--) {
                        if(row==coinTypes) {
                                // Last row does not have any parents from the bottom
                                // Last row can only look to the right for parents
                                if(col > value-coinSupplyValue[row-1]) {
                                        // No parent
                                        nodesDP[nodeNumLast].numberOfParents = 0;
                                        nodeNumLast--;
                                } else{
                                        // one child (Look right)
                                        nodesDP[nodeNumLast].numberOfParents = 1;
                                        nodesDP[nodeNumLast].parents[0] = &nodesDP[nodeNumLast+coinSupplyValue[row-1]]; //nodeNumLast-coinSupplyValue[i]
                                        nodeNumLast--;
                                }
                        } else{
                                if(col > value - coinSupplyValue[row-1]) {
                                        // One child (Look up)
                                        nodesDP[nodeNumLast].numberOfParents = 1;
                                        nodesDP[nodeNumLast].parents[0] = &nodesDP[nodeNumLast + value + 1]; // Look below
                                        nodeNumLast--;
                                } else{
                                        nodesDP[nodeNumLast].numberOfParents = 2;
                                        nodesDP[nodeNumLast].parents[0] = &nodesDP[nodeNumLast + value + 1]; // Look below
                                        nodesDP[nodeNumLast].parents[1] = &nodesDP[nodeNumLast + coinSupplyValue[row-1]]; // Look right
                                        nodeNumLast--;
                                }
                        }
                }
        }
}

/**
   Part 3
   @param root is the root node of your dependency graph, i.e: the node that doesn't depend on anything else
 **/
void runFunctionSequentialMethod_Create(ProcessTreeNode* root){
        /** Your code here **/
        // ERROR THAT I GOT ‘root’ is a pointer; did you mean to use ‘->’
        // Compute the value of the root
        if(root->nodeNumber == 0) {
                // for value of 0 there is only one way
                root->cellValue = 1;
                // Everytime when we find the ccellValue, we update the status
                root->processStatus = FINISHED;
        } else{
                //////
                /// This is for the recurssion part
                /////

                // check the number of children and deal with it separately
                // For the 0 children case it will always be 0 apart from the base root
                if(root->numberOfChildren == 0) {
                        root->cellValue = 0;
                        root->processStatus = FINISHED;
                }
                // For the 1 child case
                else if(root->numberOfChildren == 1) {
                        ProcessTreeNode* child1 = root->children[0];
                        // Wait if the child is not done
                        if(child1->processStatus != FINISHED) {
                                printf("STUCK");
                        } else{
                                root->cellValue = child1->cellValue;
                                root->processStatus = FINISHED;
                        }
                }
                // For the 2 child case
                else{
                        ProcessTreeNode* child1 = root->children[0];
                        ProcessTreeNode* child2 = root->children[1];
                        // Wait for both children to finish
                        if(child1->processStatus != FINISHED || child2->processStatus != FINISHED) {
                                printf("Stuck double");
                        } else{
                                root->cellValue = child1->cellValue + child2->cellValue;
                                root->processStatus = FINISHED;
                        }
                }
        }

        /////
        // Recurse the function
        /////

        // For every parent call the function.
        for(int par=0; par<root->numberOfParents; par++) {
                ProcessTreeNode* parent = root->parents[par];
                // Check the status and run only if it is not finished
                if(parent->processStatus!=FINISHED) {
                        runFunctionSequentialMethod_Create(parent);
                }
        }


}

/**
   Part 4
   @param root is the root node of your dependency graph, i.e: the node that doesn't depend on anything else
 **/
void runFunctionThreadMethod_Create(ProcessTreeNode* root){

        void *pointer = &root;
        printf("numberOfParents is %d\n", root->numberOfParents);
        printf("%s\n", "STARTING");

        // testfunc((void*)&(root->parents[0]));
        testfunc((void*)root);
        printf("%s\n", "DONED");
}


/**
   Part 5
   @param root is the root node of your dependency graph, i.e: the node that doesn't depend on anything else
 **/
void runFunctionProcessMethod_Create(ProcessTreeNode* root){
        /** Your code here **/
        // create a shared memeory space with Status, cellvalue
        // Creating first child

        int size = 100 * sizeof(int);
        void *addr = mmap(0, size, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);
        int status_size = 100 * sizeof(int);
        void *addrstatus = mmap(0, status_size, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);
        printf("Mapped at %p\n", addr);

        int *sharedvalue = addr;
        int *sharedstatus = addrstatus;
        // Creating second child. First child
        // also executes this line and creates
        // grandchild.
        pid_t pid = getpid();
        ProcessTreeNode* masterroot = root;
        if(root->nodeNumber == 0) {
                // for value of 0 there is only one way
                root->cellValue = 1;
                sharedvalue[root->nodeNumber] = root->cellValue;
                // Everytime when we find the ccellValue, we update the status
                root->processStatus = FINISHED;
                sharedstatus[root->nodeNumber] = FINISHED;
        }

        // if(getpid() != pid) {
        //   // if (root -> numberOfParents != 0) {
        //         while(!(sharedstatus[root->parents[0]->nodeNumber] == RUNNING || sharedstatus[root->parents[0]->nodeNumber] == FINISHED) && !(sharedstatus[root->parents[1]->nodeNumber] == RUNNING || sharedstatus[root->parents[1]->nodeNumber] == FINISHED)) {
        //                 fork();
        //                 if (sharedstatus[root->parents[0]->nodeNumber] != RUNNING && sharedstatus[root->parents[0]->nodeNumber] != FINISHED) {
        //                         sharedstatus[root->parents[0]->nodeNumber] = RUNNING;
        //                              printf("value of %d \n", root[5].nodeNumber);
        //                                                          root = root->parents[0];
        //                                                          printf("FORKED %d\n", (root->parents[0]->nodeNumber));
        //
        //                 }
        //                 else if(sharedstatus[root->parents[1]->nodeNumber] != RUNNING && sharedstatus[root->parents[1]->nodeNumber] != FINISHED) {
        //                         sharedstatus[root->parents[1]->nodeNumber] = RUNNING;
        //                                                          root = root->parents[1];
        //                                                           printf("FORKED %d\n", (root->parents[1]->nodeNumber));
        //
        //                 }
        //         }
        // }
        int i;
        int childpid;
        while (i < root->totalNumberOfNodes-1) {
                root = &root[1];
                childpid = fork();
                if(getpid() != pid) {
                        printf("FORKED AT root %d\n", root->nodeNumber);
                          break;
                        /* code */
                }
                i++;
                // for(int i=1; i < root->totalNumberOfNodes; i++){
                // root = &root[1];
                // if(getpid() == pid){
                //   printf("FORKED AT root %d\n", root->nodeNumber);
                //   fork();
                // }
                // printf("value %d is %d\n", i, sharedvalue[i]);
        }

        if(root->nodeNumber == 0) {
                // for value of 0 there is only one way
                sharedvalue[root->nodeNumber] = 1;
                // Everytime when we find the cellValue, we update the status
                sharedstatus[root->nodeNumber] = FINISHED;
        }
        else if(root->numberOfChildren == 0) {
                sharedvalue[root->nodeNumber] = 0;
                sharedstatus[root->nodeNumber] = FINISHED;
        } // For the 1 child case
        else if(root->numberOfChildren == 1) {
                // Wait if the child is not done
                // printf("%s\n", )
                while(sharedstatus[root->children[0]->nodeNumber] != FINISHED) {
                        // printf("%s\n", "waiting");
                }
                sharedvalue[root->nodeNumber] = sharedvalue[root->children[0]->nodeNumber];
                sharedstatus[root->nodeNumber] = FINISHED;
        }
// For the 2 child case
        else{
                // Wait for both children to finish
                while(sharedstatus[root->children[0]->nodeNumber] != FINISHED || sharedstatus[root->children[1]->nodeNumber] != FINISHED) {
                        // printf("%s\n", "waiting");
                }
                sharedvalue[root->nodeNumber] = sharedvalue[root->children[0]->nodeNumber] + sharedvalue[root->children[1]->nodeNumber];
                sharedstatus[root->nodeNumber] = FINISHED;
        }

        printf("DONE\n");

        // if (n1 > 0 && n2 > 0) {
        //         printf("parent\n");
        //         printf("%d %d \n", n1, n2);
        //         printf(" my id is %d \n", getpid());
        //
        //         printf("Parent read: %d\n", sharedvalue[0]);
        //         while(sharedstatus[0] != FINISHED) {
        //
        //         }
        //         printf("After 1s, parent read: %d\n", sharedvalue[1] + sharedvalue[0]);
        // }
        // else if (n1 == 0 && n2 > 0)
        // {
        //         printf("First child\n");
        //         printf("%d %d \n", n1, n2);
        //         printf("my id is %d  \n", getpid());
        //         printf("Child read: %d\n", sharedvalue[0]);
        //         printf("current value is %d\n", sharedvalue[0]);
        //         sharedvalue[0] = 10;
        //         sharedvalue[1] = 20;
        //         printf("Child wrote: %d\n", sharedvalue[0]);
        //         sleep(3);
        //         sharedstatus[0] = FINISHED;
        // }
        // else if (n1 > 0 && n2 == 0)
        // {
        //         printf("Second child\n");
        //         printf("%d %d \n", n1, n2);
        //         printf("my id is %d  \n", getpid());
        // }
        // else {
        //         printf("third child\n");
        //         printf("%d %d \n", n1, n2);
        //         printf(" my id is %d \n", getpid());
        // }
        if (childpid == 0){
          exit(-1);
        }

        if(getpid() == pid) {
                printf("test");
                while(true) {
                        if(checkdone(sharedstatus, masterroot->totalNumberOfNodes)) {
                                printf("CHECK DONE\n");
                                break;
                        }
                }
                for(int i=0; i < root->totalNumberOfNodes; i++) {

                        masterroot[i].cellValue = sharedvalue[i];
                        printf("value %d is %d\n", i, sharedvalue[i]);
                }

                munmap(addr,size);
                munmap(addrstatus,status_size);
        }
}

int checkdone(int *sharedstatus, int arr){
        bool done = true;
        for(int i = 0; i < arr; i++) {
                if(sharedstatus[i] != FINISHED) {
                        done = false;
                }
        }
        return done;
}


void *testfunc(void* args){
        ProcessTreeNode *root = (ProcessTreeNode*) args;
        root->processStatus = RUNNING;

        // For each node get the parents and make the parents recurse the function
        pthread_t thread[root->numberOfParents];
        int counter = 0;
        printf("numberOfParents is %d\n", root->numberOfParents);

        for(int i=0; i<root->numberOfParents; i++) {
                if (root->parents[i]->processStatus != RUNNING && root->parents[i]->processStatus != FINISHED) {
                        // printf("hello");
                        pthread_create(&thread[counter], NULL, testfunc, (void*)(root->parents[i]));
                        counter += 1;
                }
        }

        /** Your code here **/
        if(root->nodeNumber == 0) {
                // for value of 0 there is only one way
                root->cellValue = 1;
                // Everytime when we find the cellValue, we update the status
                root->processStatus = FINISHED;
        }
        else if(root->numberOfChildren == 0) {
                root->cellValue = 0;
                root->processStatus = FINISHED;
        } // For the 1 child case
        else if(root->numberOfChildren == 1) {
                ProcessTreeNode* child1 = root->children[0];
                // Wait if the child is not done
                // printf("%s\n", );
                while(child1->processStatus != FINISHED) {
                        // printf("%s\n", "waiting");
                }
                root->cellValue = child1->cellValue;
                root->processStatus = FINISHED;
        }
// For the 2 child case
        else{
                ProcessTreeNode* child1 = root->children[0];
                ProcessTreeNode* child2 = root->children[1];
                // Wait for both children to finish
                while(child1->processStatus != FINISHED || child2->processStatus != FINISHED) {
                        // printf("%s\n", "waiting");
                }
                root->cellValue = child1->cellValue + child2->cellValue;
                root->processStatus = FINISHED;
        }


// Collect all the threads, don't need to return anything
        if (counter>0) {
                for (int i=0; i<counter; i++) {
                        pthread_join(thread[i], (void**) NULL);
                        printf("%s\n", "DONED");
                }

        }
}
