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
    it("Should be able to set a Task", async function () {
      const { toDoContract } = await loadFixture(deployToDoFixture);

      const todoToBeCreated = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await toDoContract.setTask(
        todoToBeCreated.title,
        todoToBeCreated.description
      );

      const todoItemCreated = await toDoContract.getTask(0);

      expect(todoItemCreated.title).to.equal(todoToBeCreated.title);
    });

    it("Should be able to get a Task", async () => {
      const { toDoContract } = await loadFixture(deployToDoFixture);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await toDoContract.setTask(todoObject.title, todoObject.description);

      const todoItem = await toDoContract.getTask(0);

      expect(todoItem.title).to.not.equal("");
    });

    it("Should throw an error if Task does not exist ", async () => {
      const { toDoContract } = await loadFixture(deployToDoFixture);

      await expect(toDoContract.getTask(1)).to.be.revertedWith(
        "No where to be found"
      );
    });

    it("Should be able to mark a Task as done", async () => {
      const { toDoContract } = await loadFixture(deployToDoFixture);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await toDoContract.setTask(todoObject.title, todoObject.description);

      await toDoContract.setIsDone(0);

      const todoItem = await toDoContract.getTask(0);

      expect(todoItem.isDone).to.equal(true);
    });

    it("Should throw an error if the Task does not exist when updating ", async () => {
      const { toDoContract } = await loadFixture(deployToDoFixture);

      await expect(toDoContract.setIsDone(0)).to.be.revertedWith(
        "No where to be found"
      );
    });

    it("Should be able to delete a todo", async () => {
      const { toDoContract } = await loadFixture(deployToDoFixture);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };
      const todoObject2 = {
        title: "Pick Cloth",
        description: "Pick the cloth in the washing machine",
      };

      await toDoContract.setTask(todoObject.title, todoObject.description);
      await toDoContract.setTask(todoObject2.title, todoObject2.description);

      await toDoContract.deleteTask(0);

      const todoItem2 = await toDoContract.getTask(0);

      expect(todoItem2.title).to.be.equals(todoObject2.title);
    });
  });
});
