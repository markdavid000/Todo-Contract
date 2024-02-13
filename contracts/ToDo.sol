// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ToDo {
    struct ToDoDetails {
        string title;
        string desc;
        bool isDone;
    }

    ToDoDetails[] public toDoDetails;

   

    function setTask(string memory _title, string memory _desc) public {
        toDoDetails.push(ToDoDetails(_title, _desc, false));
    }

    function getTask(uint index) public view returns (string memory title, string memory description, bool isDone){
        return (toDoDetails[index].title, toDoDetails[index].desc, toDoDetails[index].isDone);
    }

    function getTasks() public view  returns (ToDoDetails[] memory) {
        return toDoDetails;
    }

    function getTaskIndex() public view  returns (uint256) {
        return toDoDetails.length;
    }

    function setIsDone(uint256 _index) public {
        require(_index < toDoDetails.length, "No where to be found");
        toDoDetails[_index].isDone = !toDoDetails[_index].isDone;
    }

    function changeTitle(uint256 _index, string memory _title) public  {
        require(_index < toDoDetails.length, "No where to be found");
        toDoDetails[_index].title = _title;
    }

    function changeDesc(uint256 _index, string memory _desc) public {
        require(_index < toDoDetails.length, "No where to be found");
        toDoDetails[_index].desc = _desc;
    }

    function updateTask(uint256 _index, string memory _title, string memory _desc) public {
        require(_index < toDoDetails.length, "No where to be found");
        toDoDetails[_index].title = _title;
        toDoDetails[_index].desc = _desc;
    }

    function deleteTask(uint256 _index) public {
        toDoDetails[_index] = toDoDetails[toDoDetails.length - 1];
        toDoDetails.pop();
    }
}