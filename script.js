window.addEventListener("load", () => {
  showList(data);
});

const imgUrl =
  "https://images.pexels.com/photos/4344464/pexels-photo-4344464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const data = {
  accounts: [
    {
      title: "some text 1",
      img: imgUrl,
    },
    {
      title: "some text 2",
      img: imgUrl,
    },
    {
      title: "some text 3",
      img: imgUrl,
    },
  ],
};

const getList = document.querySelector(".list");
const getScreenOne = document.querySelector(".screenOne");
const getScreenTwo = document.querySelector(".screenTwo");
const getCreateButton = document.querySelector("#createButton");
const getInput = document.querySelector(".inputText");
const getAddButton = document.querySelector("#addButton");
const getCancelButton = document.querySelector("#cancelButton");

const showList = (currentData) => {
  currentData.accounts.map((item) => {
    const listItem = document.createElement("li");
    const img = document.createElement("img");
    const title = document.createElement("p");

    listItem.className = "listItem";
    img.setAttribute("src", item.img);
    title.innerHTML = item.title;

    listItem.append(img);
    listItem.append(title);
    getList.append(listItem);
  });
};

const clearList = () => {
  const getListItems = document.querySelectorAll(".list > li");
  for (const item of getListItems) {
    item.remove();
  }
};

const toggleScreens = () => {
  getScreenOne.classList.toggle("isHidden");
  getScreenTwo.classList.toggle("isVisible");
};

getCreateButton.addEventListener("click", (e) => {
  toggleScreens();
});

getAddButton.addEventListener("click", (e) => {
  const inputValue = getInput.value;
  let newData = { ...data };

  newData.accounts.push({
    title: inputValue,
    img: imgUrl,
  });

  clearList();
  showList(newData);
  toggleScreens();
});

getCancelButton.addEventListener("click", (e) => {
  toggleScreens();
});
