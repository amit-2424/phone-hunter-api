


const lodePhone = async (searchVal = "a", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchVal}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = "";

    // show all btn
    const showAllBtn = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden');

    }

    // only display phone 12
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }



    const phone = phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button onclick="my_modal_3.showModal(),lodePhoneDetails('${phone.slug}'),loadingSpinner(true)" class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    loadingSpinner(false);

}


const searchBtn = (isShowAll) => {
    const inputFieldValue = document.getElementById('input-field').value;
    loadingSpinner(true);
    lodePhone(inputFieldValue, isShowAll);
}

// loading Spinner
const loadingSpinner = (loading) => {
    spinner = document.getElementById('loadingSpinner');
    if (loading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

// show al Btn 
const showAll = () => {
    searchBtn(true);
}


lodePhone();



// Modal details 

const lodePhoneDetails = async (phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneName}`);
    const data = await res.json();
    // console.log(data.data);
    lodePhoneDetailsDisplay(data.data);
}

const lodePhoneDetailsDisplay = (data) => {
    // console.log(data);
    let modalContainer = document.getElementById("modal-container");
    modalContainer.innerText = "";
    // console.log(modalContainer);

    const modalCard = document.createElement("div");
    modalCard.innerHTML = `
    <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <img src="${data.image}" alt="Shoes" class="rounded-xl m-auto mb-10" />
    <h3 class="font-bold text-lg">${data.name}</h3>
    <p class="py-4">${data.mainFeatures?.storage}</p>
    <p class="py-4">${data.mainFeatures?.chipSet}</p>
    <p class="py-4">${data.mainFeatures?.displaySize}</p>
    <p class="py-4">${data.mainFeatures?.memory}</p>
    `
    modalContainer.appendChild(modalCard);

    loadingSpinner(false);
}

// lodePhoneDetails("apple_iphone_13_pro_max-11089");