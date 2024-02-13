import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("TODO", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployToDoFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const ToDoContract = await ethers.getContractFactory("ToDo");
      const toDoContract = await ToDoContract.deploy();
  
      return { toDoContract, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should set the a Task", async function () {
        const { toDoContract } = await loadFixture(deployToDoFixture);
  
        const todoToBeCreated = {
          title: "Wash Cloth",
          description: "Wash the cloth in the washing machine",
        };
  
        await toDoContract.setTask(
          todoToBeCreated.title,
          todoToBeCreated.description
        );
  
        const todoItemCreated = await toDoContract.setTask(0);
  
        expect(todoItemCreated.title).to.equal(todoToBeCreated.title);
      });
    });
  });
  