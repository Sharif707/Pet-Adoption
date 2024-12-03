const removeactiveClass = () => {
  const removebtnClass = document.getElementsByClassName("category-btn");
  for (const element of removebtnClass) {
    element.classList.remove(
      "bg-[#0E7A81]",
      "rounded-xl",
      "border-2",
      "text-white"
    );
  }
};
//spinner loading functionality
const loadWhileFetching = () => {
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("display-all-pets").classList.add("hidden");
};
const loadSpinner = () => {
  document.getElementById("spinner").classList.add("hidden");
  document.getElementById("display-all-pets").classList.remove("hidden");
};

const loadCategorybtn = () => {
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("display-all-pets").classList.add("hidden");

  setTimeout(() => {
    loadSpinner();
  }, 2000);
};

//SORT by price button functionality
const descendingorderData = async () => {
  const petsData = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const response = await petsData.json();
  const allPets = response.pets;

  const sortedPetdata = allPets.sort((a, b) => {
    const val1 = a.price || 0;
    const val2 = b.price || 0;
    return val2 - val1;
  });
  displayAllPets(sortedPetdata);
};

const loadCategoryVideos = async (categoryname) => {
  // console.log(categoryname);
  removeactiveClass();

  const activeButton = document.getElementById(`btn-${categoryname}`);
  activeButton.classList.add(
    "rounded-xl",
    "border-2",
    "border-[#0E7A811A]",
    "bg-[#0E7A81]",
    "text-white"
  );

  const fetchedData = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryname}`
  );
  const convertData = await fetchedData.json();
  console.log(convertData);

  displayAllPets(convertData.data);
};

const displaypetCategory = (categories) => {
  console.log(categories);
  const categoryContainer = document.getElementById("pet-category-container");

  categories.forEach((category) => {
    const petCategory = document.createElement("div");

    petCategory.innerHTML = `
   <button onclick="loadCategoryVideos('${category.category}'); loadCategorybtn()" id="btn-${category.category}" class="category-btn py-4 px-8 flex justify-center items-center gap-2">
    <img src=${category.category_icon}>
    <h1 class="text-2xl font-bold">${category.category}</h1>
   
   </button>
     `;
    categoryContainer.appendChild(petCategory);
  });
};

const showImage = (image) => {
  const imgContainer = document.getElementById("display-img");
  const div = document.createElement("div");
  div.classList.add("flex", "flex-col", "md:flex-row", "items-center");

  div.innerHTML = `
  <img class="w-20 h-20 object-cover rounded-lg" src=${image}>
  
  `;

  imgContainer.append(div);
};

//show adopt button modal

const showAdoptModal = (thisButton) => {
  thisButton.textContent = "Adopted";
 thisButton.disabled = true;
 thisButton.classList.add("bg-gray-400", "text-white")
  const showTimedelay = document.getElementById("delay-show");
  document.getElementById("adoption_modal").showModal();
  let count = 3;
  showTimedelay.textContent = count;
  const intervalID = setInterval(() => {
    count--;
    showTimedelay.textContent = count;
    if (count === 1) {
      clearInterval(intervalID);
      showTimedelay.textContent = "Thank You";
      setTimeout(() => {
        document.getElementById("adoption_modal").close();
      }, 1000);
    }
  }, 1000);
};

const loadModaldetails = async (petdetails) => {
  const url = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petdetails}`
  );
  const response = await url.json();
  displayModal(response.petData);
};

const displayModal = (petData) => {
  let {
    image,
    breed,
    category,
    date_of_birth,
    price,
    gender,
    pet_details,
    pet_name,
    vaccinated_status,
  } = petData;

  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
<dialog id="customModal" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <img class="mx-auto w-full rounded-lg" src=${image}>
     ${
       pet_name
         ? `<h2 class="text-2xl font-extrabold my-3">${pet_name}</h2>`
         : `<h2 class="text-2xl font-extrabold text-[#131313] my-3">N/A</h2>`
     }


   <div class="flex gap-10 items-center text-[#131313] text-opacity-70 font-semibold border border-b-[#131313] border-opacity-15 mb-6">
<ul class="space-y-2">
${
  breed
    ? `<li class="flex gap-1 items-center"><img src=${"./images/icon-1.png"}>Breed:${breed}</li>`
    : "N/A"
}
${
  gender
    ? `<li class="flex gap-1 items-center"><img class="mr-1" src=${"./images/icon-2.png"}>Gender:${gender}</li>`
    : "N/A"
}
${
  vaccinated_status
    ? `
  <li class="flex gap-1 items-center">
  <img class='mr-1' src=${"./images/icon-2.png"}>Vaccinated Status:${vaccinated_status}</li>`
    : "N/A"
}
</ul>


<ul class="space-y-2">

${
  date_of_birth
    ? `<li class="flex gap-1"><img src=${"./images/icon-1.png"}> <span>Birth:${new Date(
        date_of_birth
      ).getFullYear()}</span></li>`
    : "N/A"
}
${
  price
    ? `<li class="flex gap-1"><img class="mb-1" src=${"./images/icon-7.png"}>Price: ${price}$</li>`
    : "N/A"
}

</ul>
 </div>

 <div>
 <h2 class="text-[#131313] font-bold text-2xl">Detailed Information</h2>
 <p class="text-[#131313] text-opacity-70 font-semibold text-justify mt-3">${pet_details}</p>
 
 
 </div>
    

    <div class="modal-action">
      <form class=" w-full block" method="dialog">
        <button class="btn w-full text-[#0E7A81] text-lg">Cancel</button>
      </form>
    </div>
  </div>
</dialog>


`;
  customModal.showModal();
};

//this functions displays all the pets data

const displayAllPets = (petsData) => {
  const AllpetsContainer = document.getElementById("display-all-pets");

  //  console.log(petsData);
  AllpetsContainer.innerHTML = "";
  if (petsData.length == 0) {
    AllpetsContainer.classList.remove("grid");
    AllpetsContainer.innerHTML = `
 <div class="text-center bg-[#131313] bg-opacity-5 py-5">
  <img class="mx-auto" src=${"./images/error.webp"}>
  <h2 class="text-3xl font-bold">No Information Available</h2>
  <p class="text-lg text-[#131313] text-opacity-70 w-3/5 mx-auto my-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
 
 
 </div>
   `;
    return;
  }
  AllpetsContainer.classList.add("grid");
  petsData.forEach((petinfo) => {
    // console.log(petinfo);
    let { image, pet_name, breed, category, price, gender, date_of_birth } =
      petinfo;
    const petContainer = document.createElement("div");
    petContainer.classList.add(
      "product-card",
      "p-2",
      "border",
      "border-[#131313]",
      "border-opacity-10",
      "rounded-xl",
      "text-center"
    );

    petContainer.innerHTML = `
<img class="mx-auto" src=${image}>
<h1 class="text-2xl font-bold mt-3">${pet_name}</h1>
<ul class="space-y-2 my-4 text-[#131313] text-opacity-70 font-semibold">
${breed?.length ? `<li>${breed}</li>` : "N/A"}
${date_of_birth ? `<li>Birth:${date_of_birth}</li>` : "N/A"}
${gender ? `<li>Gender:${gender}</li>` : "N/A"}
${price ? `<li>Price:$${price}</li>` : "N/A"}

</ul>
<div class="flex justify-between">
<button onclick="showImage('${
      petinfo.image
    }')" class="py-2 px-4 border border-[#0E7A8126] border-opacity-15 flex justify-center items-center rounded"><img width="24" height="24" src="https://img.icons8.com/windows/16/thumb-up.png" alt="thumb-up"/></button>

<button id="btn-adopt" onclick="showAdoptModal(this)" class="py-2 px-4 text-xl font-semibold text-[#0E7A81] border border-[#0E7A8126] rounded hover:bg-[#0E7A81] hover:text-white transition-colors">Adopt</button>


<button onclick="loadModaldetails('${
      petinfo.petId
    }')" class="py-2 px-4 text-xl font-semibold text-[#0E7A81] border border-[#0E7A8126] rounded hover:bg-[#0E7A81] hover:text-white transition-colors">Details</button>

</div>


`;
    AllpetsContainer.append(petContainer);
  });
};

const handleCategory = async () => {
  const categoryData = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const convertData = await categoryData.json();
  displaypetCategory(convertData.categories);
};

//this functions fetches all the details about the pets
const handleAllpets = async () => {
  const petsData = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const convertData = await petsData.json();
  loadWhileFetching();
  setTimeout(() => {
    loadSpinner();
    displayAllPets(convertData.pets);
  }, 2000);
};

handleAllpets();

handleCategory();
