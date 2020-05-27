// main variables
const imgUrl =
  "https://images.pexels.com/photos/4344464/pexels-photo-4344464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const data = {
  accounts: [
    {
      title: "hello world!",
      img: imgUrl,
    },
    {
      title: "javascript",
      img: imgUrl,
    },
    {
      title: "user",
      img: imgUrl,
    },
  ],
};

// constructors
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

// work with List
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

  // add focus to the first element in the list
  setFocusToFirstElement();
};

const clearList = () => {
  const getListItems = new GetElement(".list > li").selectorAll;

  for (const item of getListItems) {
    new RemoveElement(item);
  }
};

const toggleScreens = () => {
  getScreenOne.classList.toggle("isHidden");
  getScreenTwo.classList.toggle("isVisible");
};

const setFocus = (element) => {
  return element.focus();
};

const setFocusToFirstElement = () => {
  const getFirstListItem = new GetElement(".listItem").selector;
  setFocus(getFirstListItem);
};

const navigationScreenOne = (e) => {
  const getListItems = new GetElement(".list > li").selectorAll;
  const itemInFocus = getListItems[indexListItem];
  const newData = { ...data };
  const tabindex = document.activeElement.getAttribute("tabindex");

  switch (e.keyCode) {
    case 37:
      if (tabindex !== 0) {
        newData.accounts.splice(indexListItem, 1);
        clearList();
        showList(newData);
      }
      setFocus(itemInFocus);
      console.log("tabindex", tabindex);
      break;
    case 38:
      indexListItem--;
      console.log("up itemInFocus", itemInFocus.getAttribute("tabindex"));
      console.log("tabindex", tabindex);
      setFocus(itemInFocus);
      console.log("indexListItem", indexListItem);
      break;
    case 39:
      setFocus(getCreateButton);
      console.log("tabindex", tabindex);
      break;
    case 40:
      indexListItem++;
      console.log("down itemInFocus", itemInFocus.getAttribute("tabindex"));
      console.log("tabindex", tabindex);
      setFocus(itemInFocus);
      console.log("indexListItem", indexListItem);
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

  newData.accounts.push({
    title: inputValue,
    img: imgUrl,
  });

  if (inputValue === "") {
    setFocus(getInput);
  }

  if (inputValue !== "" && e.keyCode === 13) {
    clearList();
    showList(newData);
    toggleScreens();
    getInput.value = "";
    setFocusToFirstElement();
  }
};

const onCancelAccount = (e) => {
  toggleScreens();
  getInput.value = "";
  setFocusToFirstElement();
};

const onPageLoad = () => {
  showList(data);
};

//  global variables
let indexListItem = 0;
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
window.addEventListener("load", onPageLoad);
