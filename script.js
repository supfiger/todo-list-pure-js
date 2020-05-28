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
    listItem.setAttribute("tabindex", index + 1);
    img.setAttribute("src", item.img);
    title.innerHTML = item.title;

    new AppendElement(listItem, img);
    new AppendElement(listItem, title);
    new AppendElement(getList, listItem);
  });
};

const updateList = (newData, accountsLength) => {
  clearList();
  showList(newData);

  if (accountsLength !== 0) {
    setFocusToFirstElement();
  }
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
  const focusedAccount = document.activeElement;
  const accountsLength = data.accounts.length;
  const isFocusOnButton =
    e.key === "ArrowLeft" &&
    focusedAccount.getAttribute("id") === "createButton" &&
    accountsLength !== 0;

  const onArrowLeft = () => {
    const accountToFocus = getList.children[positionListItem];

    switch (isFocusOnButton) {
      case true:
        setFocus(accountToFocus);
        break;
      case false:
        newData.accounts.splice(positionListItem, 1);
        updateList(newData, newData.accounts.length);
        positionListItem = 0;
        data.accounts.length !== 0
          ? setFocus(accountToFocus)
          : setFocus(getCreateButton);
        break;
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
    if (positionListItem < accountsLength - 1) {
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

  switch (e.key) {
    case "ArrowLeft":
      if (!isInputFocused) {
        setFocus(getAddButton);
        whichButton = getAddButton;
      }
      break;
    case "ArrowUp":
      setFocus(getInput);
      break;
    case "ArrowRight":
      if (!isInputFocused) {
        setFocus(getCancelButton);
        whichButton = getCancelButton;
      }
      break;
    case "ArrowDown":
      setFocus(whichButton);
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
  if (e.key === "Enter") {
    toggleScreens();
    setFocus(getInput);
  }
};

const onAddAccount = (e) => {
  const inputValue = getInput.value;
  const newData = { ...data };
  if (e.key === "Enter") {
    newData.accounts.push({
      title: inputValue,
      img: imgUrl,
    });

    updateList(newData);
    toggleScreens();
    getInput.value = "";
    setFocusToFirstElement();
  }
};

const onCancelAccount = (e) => {
  if (e.key === "Enter") {
    toggleScreens();
    setFocusToFirstElement();
    getInput.value = "";
  }
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
const getInput = new GetElement(".inputText").selector;
const getScreenOne = new GetElement(".screenOne").selector;
const getScreenTwo = new GetElement(".screenTwo").selector;
const getCreateButton = new GetElement("#createButton").selector;
const getAddButton = new GetElement("#addButton").selector;
const getCancelButton = new GetElement("#cancelButton").selector;
let positionListItem = 0;
let whichButton = getAddButton;

// add listeners
getCreateButton.addEventListener("keydown", onCreateAccount);
getAddButton.addEventListener("keydown", onAddAccount);
getCancelButton.addEventListener("keydown", onCancelAccount);
getScreenOne.addEventListener("keydown", navigationScreenOne);
getScreenTwo.addEventListener("keydown", navigationScreenTwo);
document.addEventListener("mousedown", (e) => e.preventDefault());

// show list of accounts
showList(data);
setFocusToFirstElement();
