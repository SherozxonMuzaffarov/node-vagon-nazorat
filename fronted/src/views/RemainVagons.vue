<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0"><i class="bi bi-house-door-fill"></i>Qoldiq Vagonlar</p>
    </div>

    <!-- Modal create -->
    <BModal
      class="modal-dialog modal-xl"
      v-model="modalCreate"
      @ok.prevent="handleOk"
      @keyup.enter="handleOk"
      @cancel="modalCreate = !modalCreate"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
    >
      <div class="row">
        <div class="col-6">
          <label for="nomer" class="form-label">Vagon nomeri</label>
          <BFormInput v-model="formData.nomer" id="nomer" class="mb-3" />
        </div>
        <div class="col-6">
          <label for="year" class="form-label">Ishlab chiqarilgan yili</label>
          <BFormInput v-model="formData.year" id="year" />
        </div>
        <div class="col-6">
          <label for="vagonType" class="form-label">Vagon turi</label>
          <BFormSelect v-model="formData.vagon_type_id" :options="vagonTypes" id="vagonType" class="mb-3" >
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled >-- vagon turi --</BFormSelectOption >
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="repairType" class="form-label">Tamir Turi</label>
          <BFormSelect
            v-model="formData.repair_type_id"
            :options="repairTypes"
            id="repairType"
            class="mb-3"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled
                >-- Tamir turi --</BFormSelectOption
              >
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="depo" class="form-label">Depo</label>
          <BFormSelect v-model="formData.depo_id" :options="depos" id="depo" class="mb-3">
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="owner" class="form-label">Egasi</label>
          <BFormSelect v-model="formData.owner_id" :options="owners" id="owner" class="mb-3">
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Egasi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col">
          <label for="remainComment" class="form-label">Izoh</label>
          <BFormInput
            v-model="formData.remain_comment"
            id="remainComment"
            class="mb-3"
            placeholder="Izoh"
          />
        </div>
      </div>
    </BModal>
    <!-- Modal create -->

    <!-- Modal update -->
    <BModal
      v-model="modalUpdate"
      @ok.prevent="handleUpdate"
      @keyup.enter="handleUpdate"
      @cancel="modalUpdate = !modalUpdate"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
    >
      <div class="row">
        <div class="col-6">
          <label for="nomer" class="form-label">Vagon nomeri</label>
          <BFormInput v-model="formData.nomer" id="nomer" class="mb-3" />
        </div>
        <div class="col-6">
          <label for="year" class="form-label">Ishlab chiqarilgan yili</label>
          <BFormInput v-model="formData.year" id="year" />
        </div>
        <div class="col-6">
          <label for="vagonType" class="form-label">Vagon turi</label>
          <BFormSelect
            v-model="formData.vagon_type_id"
            :options="vagonTypes"
            id="vagonType"
            class="mb-3"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled
                >-- vagon turi --</BFormSelectOption
              >
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="repairType" class="form-label">Tamir Turi</label>
          <BFormSelect
            v-model="formData.repair_type_id"
            :options="repairTypes"
            id="repairType"
            class="mb-3"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled
                >-- Tamir turi --</BFormSelectOption
              >
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="depo" class="form-label">Depo</label>
          <BFormSelect v-model="formData.depo_id" :options="depos" id="depo" class="mb-3">
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="owner" class="form-label">Egasi</label>
          <BFormSelect v-model="formData.owner_id" :options="owners" id="owner" class="mb-3">
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Egasi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col">
          <label for="remainComment" class="form-label">Izoh</label>
          <BFormInput
            v-model="formData.remain_comment"
            id="remainComment"
            class="mb-3"
            placeholder="Izoh"
          />
        </div>
      </div>
      {{ formData }}
    </BModal>
    <!-- Modal update -->

<!-- Filter -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body d-flex justify-content-center align-items-center">
            <button
              class="btn btn-success d-flex align-items-center fs-5 me-5"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="modalCreate = !modalCreate"
            >
              <i class="bi bi-plus-circle me-2"></i>
              <span>Vagon qo'shish</span>
            </button>
            <form th:action="@{/vagons/filter}" method="get" class="row gy-3">
              <div class="col-6">
                <BFormSelect v-model="formData.depo_id" :options="depos" id="depo" class="mb-3">
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
                  </template>
                </BFormSelect>
              </div>
              <div class="col-6">
                <BFormSelect
                  v-model="formData.vagon_type_id"
                  :options="vagonTypes"
                  id="vagonType"
                  class="mb-3"
                >
                 <!-- This slot appears above the options from 'options' prop -->
                 <template #first>
                    <BFormSelectOption :value="null" disabled>-- Vagon turi --</BFormSelectOption>
                  </template>
                </BFormSelect>
              </div>
              <div class="col">
                <BFormSelect v-model="formData.owner_id" :options="owners" id="owner" class="mb-3">
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <BFormSelectOption :value="null" disabled>-- Egasi --</BFormSelectOption>
                  </template>
                </BFormSelect>
              </div>
              <div class="col">
                <button class="mx-auto btn btn-primary w-100" type="submit">
                  <i class="bi bi-funnel"></i>
                  <span>Filter</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
{{ deposCount }}
<!-- Table -->
    <div class="mt-5">
      <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BThead class="table-dark">
              <BTr>
                <BTh>Vagon Type</BTh>
                <BTh v-for="depo in deposCount" :key="depo.value">{{ depo  }}</BTh>
                <BTh>Total</BTh>
              </BTr>
            </BThead>
            <BTbody>
              <BTr v-for="vagonType in vagonTypesCount" :key="vagonType.vagon_type_id">
                <BTd>{{ vagonType.vagon_type_id }}</BTd>
                <BTd v-for="count in vagonType.vagon_counts" :key="count.depo_id">
                  {{ count.count }}
                </BTd>
              </BTr>
            </BTbody>
          </BTableSimple>
        </div>
      </div>
    </div>

<!-- List -->
    <div class="mt-5">
      <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BThead class="table-dark">
              <BTr class="align-middle">
                <BTh scope="col">№</BTh>
                <BTh scope="col">Nomeri</BTh>
                <BTh scope="col">Ishlab chiqarilgan yili</BTh>
                <BTh scope="col">Vagon turi</BTh>
                <BTh scope="col">Ta'mir turi</BTh>
                <BTh scope="col">Egasi</BTh>
                <BTh scope="col">VCHD</BTh>
                <BTh scope="col">Depoga kelgan vaqti</BTh>
                <BTh scope="col">Izoh</BTh>
                <BTh scope="col" class="d-flex justify-content-center">
                  Action
                </BTh>
              </BTr>
            </BThead>
            <BTbody>
              <BTr class="align-middle" v-for="(item, index) in Data" :key="item._id" >
                <BTh class="id-tr" >{{ index + 1 }}</BTh>
                <BTd >{{ item?.nomer }}</BTd>
                <BTd >{{ item?.year }}</BTd>
                <BTd >{{ item?.vagon_type_id?.name }}</BTd>
                <BTd >{{ item?.repair_type_id?.name }}</BTd>
                <BTd >{{ item?.owner_id?.name }}</BTd>
                <BTd >{{ item?.depo_id?.name }}</BTd>
                <BTd >{{ item?.remain_comment }}</BTd>
                <BTd >{{ item?.createdAt }}</BTd>
                <BTd class="d-flex justify-content-center">
                  <button @click="getOne(item._id)" class="btn btn-primary m-0">
                    <i class="bi bi-pen-fill"></i>
                  </button>
                  <button @click="deleteItem(item._id)" class="btn btn-danger m-0">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </BTd>
              </BTr>
            </BTbody>
          </BTableSimple>
        </div>
      </div>
    </div>
  </div>

  {{ data }} <br>
  {{ vagonTypesCount }} <br>
  {{ deposCount }} <br>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const modalCreate = ref(false);
const modalUpdate = ref(false);
const Data = ref([]);
let depos = ref([]);
let owners = ref([]);
let vagonTypes = ref([]);
let repairTypes = ref([]);

let data = ref([]);

const vagonTypesCount = ref([]);// Assuming you have a predefined list of depo_ids
let deposCount = ref([]);

//getVagonTable
let getVagonTable = async () => {
  try {
    // Fetch vagon data from the server
    const response = await axios.get('/vagon/get-vagon-table'); // Replace with your API endpoint
    data = response.data;
    vagonTypesCount.value = data.vagonTypes;
    deposCount.value = data.depos;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const formData = ref({
  _id: null,
  nomer: null,
  vagon_type_id: null,
  repair_type_id: null,
  owner_id: null,
  year: null,
  depo_id: null,
  remain_comment: null,
});

//create
const handleOk = async () => {
  try {
    alert("Saqlnamoqchi")
    let res = await axios.post("/vagon/create", formData.value);
    if (res.data) {
      getAll();
      modalCreate.value = !modalCreate.value;
      makeFormNull()
    }
  } catch (error) {
    console.error(error);
  }
};

const makeFormNull = () => {
  formData.value._id = null,
  formData.value.nomer = null,
  formData.value.vagon_type_id = null,
  formData.value.repair_type_id = null,
  formData.value.owner_id = null,
  formData.value.year = null,
  formData.value.depo_id = null,
  formData.value.remain_comment = null,
  formData.value.depo_id = null;
}

//delete
const deleteItem = async (id) => {
  try {
    if (!id) return;
    let confirmDelete = confirm("Tasdiqlaysizmi?");
    if (confirmDelete) {
      try {
        let res = await axios.delete("/vagon/delete/" + id);
        alert("Ma'lumot o'chirildi");
        getAll();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Delete cancelled");
    }
  } catch (error) {
    console.error(error);
  }
};

//getAllVagon
let getAll = async () => {
  try {
    let res = await axios.get("/vagon/all");
    if (res.data) {
      Data.value = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// getOne;
let getOne = async (id) => {
  try {
    let res = await axios.get("/vagon/one/" + id);
    if (res.data) {
      formData.value = res.data;
      modalUpdate.value = !modalUpdate.value;
    }
  } catch (error) {
    console.error(error);
  }
};

//getAllDepos
let getAllDepos = async () => {
  try {
    let res = await axios.get("/depo/all");
    if (res.data) {
      depos.value = res.data.map(function (item) {
        return { text: item.name, value: item._id };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// update
const handleUpdate = async () => {
  let id = formData.value._id;
  try {
    let res = await axios.patch("/vagon/update/" + id, formData.value);
    if (res) {
      getAll();
      modalUpdate.value = !modalUpdate.value;
      makeFormNull()
    }
  } catch (error) {
    console.error(error);
  }
};

//getAllOwners
let getAllOwners = async () => {
  try {
    let res = await axios.get("/owner/all");
    if (res.data) {
      owners.value = res.data.map(function (item) {
        return { text: item.name, value: item._id };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//getAllVagonTypes
let getAllVagonTypes = async () => {
  try {
    let res = await axios.get("/vagon-type/all");
    if (res.data) {
      vagonTypes.value = res.data.map(function (item) {
        return { text: item.name, value: item._id };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//getAllRepairTypes
let getAllRepairTypes = async () => {
  try {
    let res = await axios.get("/repair-type/all");
    if (res.data) {
      repairTypes.value = res.data.map(function (item) {
        return { text: item.name, value: item._id };
      });
    }
  } catch (error) {
    console.error(error);
  }
};



onMounted(() => {
  getAll();
  getVagonTable();
  getAllDepos();
  getAllOwners();
  getAllVagonTypes();
  getAllRepairTypes();
});
</script>

<style lang="scss" scoped>
.id-tr {
  width: 23px;
  text-align: center;
}

.btns {
  width: 70px;
  text-align: center;
}
</style>
