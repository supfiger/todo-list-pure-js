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
    console.log("index", index);
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
  const getFirstListItem = new GetElement(".listItem").selector;
  setFocusToElement(getFirstListItem);
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

const setFocusToElement = (element) => {
  return element.focus();
};

const navigationScreenOne = (e) => {
  let indexListItem = 0;
  let isFocusOnList = true;
  const getListItems = new GetElement(".list > li").selectorAll;
  const itemInFocus = getListItems[indexListItem];
  const newData = { ...data };
  const focused = document.activeElement;

  switch (e.keyCode) {
    case 37:
      console.log("focused", focused);
      isFocusOnList = true;
      if (focused.tabindex !== 0) {
        newData.accounts.splice(indexListItem, 1);
        clearList();
        showList(newData);
        setFocusToElement(itemInFocus);
      }

      break;
    case 38:
      console.log("focused", focused);
      break;
    case 39:
      console.log("focused", focused);
      isFocusOnList = false;
      getCreateButton.setAttribute("tabindex", 0);
      setFocusToElement(getCreateButton);
      break;
    case 40:
      indexListItem += 1;
      console.log("indexListItem", indexListItem);
      setFocusToElement(itemInFocus);

      console.log("focused", focused);
      break;

    default:
      break;
  }
};

const navigationScreenTwo = (e) => {};

// buttons functions
const onCreateAccount = (e) => {
  if (e.keyCode === 13) {
    toggleScreens();
  }
};

const onAddAccount = (e) => {
  const getInput = new GetElement(".inputText").selector;
  const inputValue = getInput.value;
  const newData = { ...data };

  newData.accounts.push({
    title: inputValue,
    img: imgUrl,
  });

  if (e.keyCode === 13) {
    clearList();
    showList(newData);
    toggleScreens();
  }
};

const onCancelAccount = (e) => {
  toggleScreens();
};

const onPageLoad = () => {
  showList(data);
};

//  global variables
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
