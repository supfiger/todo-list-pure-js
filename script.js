// constructors for work with DOM
function GetElement(element) {
  this.selector = document.querySelector(element);
  this.selectorAll = document.querySelectorAll(element);
}
function CreateElement(element) {
  return (this.element = document.createElement(element));
}
function AppendElement(parent, children) {
  return parent.append(children);
}
function RemoveElement(element) {
  return element.remove();
}

// work with List of accounts
const showList = (currentData) => {
  const { accounts } = currentData;

  accounts.map((item, index) => {
    const getList = new GetElement(".list").selector;
    const listItem = new CreateElement("li");
    const img = new CreateElement("img");
    const title = new CreateElement("p");

    listItem.classList.add("listItem");
    listItem.setAttribute("tabindex", index);
    img.setAttribute("src", item.img);
    title.innerHTML = item.title;

    new AppendElement(listItem, img);
    new AppendElement(listItem, title);
    new AppendElement(getList, listItem);
  });

  // add focus to the first element in the list
  setFocusToFirstElement();
};
const updateList = (newData) => {
  clearList();
  showList(newData);
};
const clearList = () => {
  const getListItems = new GetElement(".list > li").selectorAll;

  for (const item of getListItems) {
    new RemoveElement(item);
  }
};

// set focus to DOM element
const setFocus = (element) => {
  return element.focus();
};
const setFocusToFirstElement = () => {
  const getFirstListItem = new GetElement(".listItem").selector;
  setFocus(getFirstListItem);
};

// work with screens
const navigationScreenOne = (e) => {
  const getList = new GetElement(".list").selector;
  const newData = { ...data };
  const focusedItem = document.activeElement;
  const lengthList = getList.children.length;
  const isFocusOnButton =
    e.key === "ArrowLeft" && focusedItem.getAttribute("id") === "createButton";
  console.log("lengthList", lengthList);

  const onArrowLeft = () => {
    switch (isFocusOnButton) {
      case true:
        setFocus(getList.children[positionListItem]);
        break;
      case false:
        newData.accounts.splice(positionListItem, 1);
        updateList(newData);
        positionListItem = 0;

        if (lengthList === 2) {
          setFocus(getCreateButton);
        }
      default:
        break;
    }
  };
  const onArrowUp = () => {
    if (positionListItem > 0) {
      positionListItem -= 1;
      setFocus(getList.children[positionListItem]);
    }
  };
  const onArrowDown = () => {
    if (positionListItem < lengthList - 1) {
      positionListItem += 1;
      setFocus(getList.children[positionListItem]);
    }
  };

  switch (e.key) {
    case "ArrowLeft":
      onArrowLeft();
      break;
    case "ArrowUp":
      onArrowUp();
      break;
    case "ArrowRight":
      setFocus(getCreateButton);
      break;
    case "ArrowDown":
      onArrowDown();
      break;
    default:
      break;
  }
};
const navigationScreenTwo = (e) => {
  const isInputFocused = document.activeElement === getInput;
  switch (e.keyCode) {
    case 37:
      if (isInputFocused) {
        setFocus(getAddButton);
      }
      break;
    case 38:
      setFocus(getInput);
      break;
    case 39:
      if (isInputFocused) {
        setFocus(getCancelButton);
      }
      break;
    case 40:
      setFocus(getAddButton);
      break;

    default:
      break;
  }
};
const toggleScreens = () => {
  getScreenOne.classList.toggle("isHidden");
  getScreenTwo.classList.toggle("isVisible");
};

// buttons functions
const onCreateAccount = (e) => {
  if (e.keyCode === 13) {
    toggleScreens();
    setFocus(getInput);
  }
};
const onAddAccount = (e) => {
  const inputValue = getInput.value;
  const newData = { ...data };
  const conditions = inputValue !== "" && e.keyCode === 13;

  newData.accounts.push({
    title: inputValue,
    img: imgUrl,
  });

  if (inputValue === "") {
    setFocus(getInput);
  }

  if (conditions) {
    updateList(newData);
    toggleScreens();
    getInput.value = "";
  }
};
const onCancelAccount = (e) => {
  toggleScreens();
  getInput.value = "";
  setFocusToFirstElement();
};

// basic variables
const imgUrl =
  "https://images.pexels.com/photos/4344464/pexels-photo-4344464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
const data = {
  accounts: [
    {
      title: "1",
      img: imgUrl,
    },
    {
      title: "2",
      img: imgUrl,
    },
    {
      title: "3",
      img: imgUrl,
    },
  ],
};

//  global variables
let positionListItem = 0;
const getInput = new GetElement(".inputText").selector;
const getScreenOne = new GetElement(".screenOne").selector;
const getScreenTwo = new GetElement(".screenTwo").selector;
const getCreateButton = new GetElement("#createButton").selector;
const getAddButton = new GetElement("#addButton").selector;
const getCancelButton = new GetElement("#cancelButton").selector;

// add listeners
getCreateButton.addEventListener("keydown", onCreateAccount);
getAddButton.addEventListener("keydown", onAddAccount);
getCancelButton.addEventListener("keydown", onCancelAccount);
getScreenOne.addEventListener("keydown", navigationScreenOne);
getScreenTwo.addEventListener("keydown", navigationScreenTwo);

// show list of accounts
showList(data);
