<script setup>
import { toast } from 'vue3-toastify'
import { ref, reactive, onMounted } from 'vue'
import { productStore } from '../../stores/product/productStore.js'
import { productTypeStore } from '../../stores/product/producType.js'
import { useProduct } from '../../service/product'
import { userStore } from '../../stores/user/userStore'
import { Upload } from 'upload-js'

const modal = ref(false)
const search = ref('')
const toggleModal = () => (modal.value = !modal.value)
const fileLink = ref('')
const userStore2 = userStore()

const upload = Upload({ apiKey: 'public_12a1yEX912uU1bYwPjWP6JGFm3QZ' })

const onFileSelected = async (event) => {
  console.log(event.target.files)
  const [file] = event.target.files
  const { fileUrl } = await upload.uploadFile(file, { onProgress })
  fileLink.value = fileUrl
}

const onProgress = ({ progress }) => {
  console.log(`File uploading: ${progress}% complete.`)
}
const productInfo = reactive({
  name: '',
  price: '',
  category_id: '',
  description: ''
})
const store = productStore()
const state = productTypeStore()

const listUpdate = () => {
  state.GETLIST
}

const updateTheVariable = (value) => {
  productInfo.description = value
}

const addProduct = async () => {
  const product = {
    name: productInfo.name,
    price: productInfo.price,
    category_id: productInfo.category_id,
    img: fileLink.value,
    description: productInfo.description,
    staff_id: userStore2.USER._id
  }
  useProduct
    .CREATE(product)
    .then(() => {
      listUpdate()
      toggleModal()
      toast.success("Maxsulot turi muvaffaqiyatli qo'shildi", {
        autoClose: 1000,
        theme: 'light'
      })
      for (let i in productInfo) productInfo[i] = ''
    })
    .catch((err) => {
      console.log(err)
      toast.error(err?.response?.data?.msg, {
        autoClose: 1000,
        theme: 'light'
      })
    })
}

onMounted(() => {
  userStore2.SET_USER()
  listUpdate()
})
</script>

<template>
  <div class="p-3">
    <h2 class="uppercase dark:text-white text-gray-900 p-2 text-xl text-center font-bold">
      Products
    </h2>

    <!-- Main modal -->
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-[#00000080]"
      :class="modal ? '' : 'hidden'"
    >
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
            <button
              @click="toggleModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form @submit.prevent="addProduct">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mahsulot nomi</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mahsulot nomini kiriting..."
                  required=""
                  v-model="productInfo.name"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                  >Mahsulot rasmi</label
                >
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="fileupload"
                  type="file"
                  multiple
                  @change="onFileSelected"
                />
              </div>
              <div>
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mahsulot narxi</label
                >
                <input
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mahsulot narxi kiriting..."
                  required=""
                  v-model="productInfo.price"
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mahsulot turi</label
                >
                <select
                  id="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="productInfo.category_id"
                >
                  <option selected disabled>Maxsulot turini tanlang</option>
                  <option v-for="el in state.LIST" :key="el._id" :value="el._id">
                    {{ el.name }}
                  </option>
                </select>
              </div>
              <div class="col-span-2">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mahsulot haqida</label
                >
                <textarea
                  id="message"
                  rows="2"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mahsulot haqida qisqacha yozing..."
                  @input="updateTheVariable($event.target.value)"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Yangi Mahsulotni qo'shish
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- ================= PRODUCT TABLE ================= -->

    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 md:p-0">
      <div class="w-full max-w-screen px-0 lg:p-0">
        <!-- Start coding here -->
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
          >
            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">Qidiruv</label>
                <div class="relative w-full">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20"
                  >
                    <i class="bx bxs-search text-white text-xl"></i>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Qidiruv"
                    required=""
                    v-model="search"
                  />
                </div>
              </form>
            </div>
            <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
            >
              <button
                @click="toggleModal"
                id="defaultModalButton"
                data-modal-toggle="defaultModal"
                type="button"
                class="flex items-center justify-center dark:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <i class="bx bx-plus text-xl"></i>
                Mahsulot qo'shish
              </button>
              <div class="flex items-center space-x-3 w-full md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <i class="bx bx-chevron-down text-xl mr-1"></i>
                  Filter
                </button>
                <div
                  id="actionsDropdown"
                  class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="actionsDropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >ADMIN</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >YETKAZUVCHI</a
                      >
                    </li>
                  </ul>
                </div>
                <button
                  id="filterDropdownButton"
                  data-dropdown-toggle="filterDropdown"
                  class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <i class="bx bxs-filter-alt text-xl mr-1"></i>
                  Saralash
                  <i class="bx bx-chevron-down text-xl ml-1"></i>
                </button>
                <div
                  id="filterDropdown"
                  class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Choose brand
                  </h6>
                  <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                    <li class="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="apple"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >Apple (56)</label
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-4 py-3">Mahsulot nomi</th>
                  <th scope="col" class="px-4 py-3">Mahsulot narxi</th>
                  <th scope="col" class="px-4 py-3">Mahsulot turi</th>
                  <th scope="col" class="px-4 py-3">Qo'shilgan sanasi</th>
                  <th scope="col" class="px-4 py-3">Rasmi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="el in store.LIST" class="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ el.name }}
                  </th>
                  <td class="px-4 py-3">{{ el.price }}</td>
                  <td class="px-4 py-3">{{ el.category_id[0].name }}</td>
                  <td class="px-4 py-3">{{ el.createdAt.slice(0, 10) }}</td>
                  <td class="px-4 py-3">
                    <img
                      :src="el.img"
                      class="rounded-xl h-[60px] w-[100px] border border-dashed"
                      alt=""
                    />
                  </td>
                  <td class="px-4 py-3 flex items-center justify-end">
                    <button
                      id="apple-imac-27-dropdown-button"
                      data-dropdown-toggle="apple-imac-27-dropdown"
                      class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      type="button"
                    >
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                        />
                      </svg>
                    </button>
                    <div
                      id="apple-imac-27-dropdown"
                      class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        class="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="apple-imac-27-dropdown-button"
                      >
                        <li>
                          <a
                            href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >Show</a
                          >
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >Edit</a
                          >
                        </li>
                      </ul>
                      <div class="py-1">
                        <a
                          href="#"
                          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >Delete</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
              of
              <span class="font-semibold text-gray-900 dark:text-white">1000</span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >1</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
