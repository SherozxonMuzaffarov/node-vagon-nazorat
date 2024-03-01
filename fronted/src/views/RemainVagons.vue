<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0"><i class="bi bi-house-door-fill"></i>Qoldiq Vagonlar</p>
    </div>

    <!-- Modal create -->
    <BModal
      class="modal-dialog modal-dialog-centered modal-xl"
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
          <BFormInput v-model="FormData.nomer" id="nomer" class="mb-3" />
        </div>
        <div class="col-6">
          <label for="year" class="form-label">Ishlab chiqarilgan yili</label>
          <BFormInput v-model="FormData.year" id="year" />
        </div>
        <div class="col-6">
          <label for="vagonType" class="form-label">Vagon turi</label>
          <BFormSelect
            v-model="FormData.vagon_type_id"
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
            v-model="FormData.repair_type_id"
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
          <BFormSelect v-model="FormData.depo_id" :options="depos" id="depo" class="mb-3">
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="owner" class="form-label">Egasi</label>
          <BFormSelect v-model="FormData.owner" :options="owners" id="owner" class="mb-3">
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Egasi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col">
          <label for="remainComment" class="form-label">Izoh</label>
          <BFormInput
            v-model="FormData.remain_comment"
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
          <BFormInput v-model="FormData.nomer" id="nomer" class="mb-3" />
        </div>
        <div class="col-6">
          <label for="year" class="form-label">Ishlab chiqarilgan yili</label>
          <BFormInput v-model="FormData.year" id="year" />
        </div>
        <div class="col-6">
          <label for="vagonType" class="form-label">Vagon turi</label>
          <BFormSelect
            v-model="FormData.vagon_type_id"
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
            v-model="FormData.repair_type_id"
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
          <BFormSelect v-model="FormData.depo_id" :options="depos" id="depo" class="mb-3">
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col-6">
          <label for="owner" class="form-label">Egasi</label>
          <BFormSelect v-model="FormData.owner" :options="owners" id="owner" class="mb-3">
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <BFormSelectOption :value="null" disabled>-- Egasi --</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
        <div class="col">
          <label for="remainComment" class="form-label">Izoh</label>
          <BFormInput
            v-model="FormData.remain_comment"
            id="remainComment"
            class="mb-3"
            placeholder="Izoh"
          />
        </div>
      </div>
    </BModal>
    <!-- Modal update -->

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
                <BFormSelect v-model="FormData.depo_id" :options="depos" id="depo" class="mb-3">
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
                  </template>
                </BFormSelect>
              </div>
              <div class="col-6">
                <BFormSelect
                  v-model="FormData.vagon_type_id"
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
                <BFormSelect v-model="FormData.owner" :options="owners" id="owner" class="mb-3">
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

    <div class="mt-5">
      <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
        <div class="card-body">
          <table class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
              <tr>
                <th scope="col">Vagon turlari</th>
                <th scope="col">VCHD-3</th>
                <th scope="col">VCHD-5</th>
                <th scope="col">VCHD-6</th>
                <th scope="col">Jami</th>
              </tr>
            </thead>
            <tbody>
              <tr class="align-middle">
                <th th:text="'Yopiq vagon (крыт)'"></th>
                <td th:text="${havKritiy}"></td>
                <td th:text="${andjKritiy}"></td>
                <td th:text="${samKritiy}"></td>
                <td th:text="${samKritiy + havKritiy + andjKritiy}"></td>
              </tr>
              <tr class="align-middle">
                <th th:text="'Platforma(пф)'"></th>
                <td th:text="${havPlatforma}"></td>
                <td th:text="${andjPlatforma}"></td>
                <td th:text="${samPlatforma}"></td>
                <td th:text="${samPlatforma + havPlatforma + andjPlatforma}"></td>
              </tr>

              <tr class="align-middle">
                <th>Oxirgi o'zgarish vaqti</th>
                <td th:text="${havDate}"></td>
                <td th:text="${andjDate}"></td>
                <td th:text="${samDate}"></td>
                <td>
                  <a class="btn btn-success" th:href="@{/vagons/createTableExcel}">
                    <i class="bi bi-download"></i>
                    Yuklab olish
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
        <div class="card-body">
          <table class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
              <tr class="align-middle">
                <th scope="col">№</th>
                <th scope="col">Nomeri</th>
                <th scope="col">Vagon turi</th>
                <th scope="col">VCHD</th>
                <th scope="col">Ta'mir turi</th>
                <th scope="col">Ishlab chiqarilgan yili</th>
                <th scope="col">Depoga kelgan vaqti</th>
                <!--                  <th scope="col">Saqlangan vaqti</th>-->
                <th scope="col">Egasi</th>
                <th scope="col">Izoh</th>
                <th scope="col" class="d-flex justify-content-center">
                  Action
                  <!--                    <a class="btn btn-primary" th:href="@{/vagons/createExcel}" >-->
                  <!--                      <i class="bi bi-download"></i>-->
                  <!--                      Yuklab olish-->
                  <!--                    </a>-->
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="align-middle"
                th:each="vagon, iStat:${vagons}"
                th:class="${vagon.status == false} ? 'text-danger' : ''"
              >
                <th scope="row" th:text="${iStat.count}"></th>
                <td
                  th:class="${vagon.status == false} ? 'text-danger' : ''"
                  th:text="${vagon.nomer}"
                ></td>
                <td th:text="${vagon.vagonTuri}"></td>
                <td th:text="${vagon.depoNomi}"></td>
                <td th:text="${vagon.remontTuri}"></td>
                <td th:text="${vagon.ishlabChiqarilganYili}"></td>
                <td th:text="${vagon.kelganVaqti}">
                  <!--                    <span th:style="${vagon.status == false and #dates.createNow().daysBetween(#dates.create(vagon.kelganVaqti)).days < 3} ? 'color: red;' : ''"-->
                  <!--                          th:text="${vagon.kelganVaqti}"></span>-->
                </td>
                <!--                  <td th:text="${vagon.createdDate}"></td>-->
                <td th:text="${vagon.country}"></td>
                <td th:text="${vagon.izoh}"></td>
                <td class="d-flex justify-content-center">
                  <a
                    class="btn btn-danger"
                    th:href="@{/vagons/delete/{id}(id=${vagon.id})}"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Table -->
    <BTableSimple striped="true" hover="true" bordered="true">
      <BThead class="table-dark">
        <BTr class="align-middle">
          <BTh scope="col">№</BTh>
          <BTh scope="col">O'V va SU nomlari</BTh>
          <BTh scope="col">Soni</BTh>
          <BTh scope="col">Ishlab chiqarilgan yili</BTh>
          <BTh scope="col">Zavodda ishlab chiqarilgan raqami</BTh>
          <BTh scope="col">Turi</BTh>
          <BTh scope="col">Bajaradigan ishi</BTh>
          <BTh scope="col">VCHD</BTh>
          <BTh scope="col">Izoh</BTh>
          <BTh scope="col">Action</BTh>
          <BTh scope="col" class="d-flex justify-content-center"></BTh>
          <BTh class="btns"></BTh>
        </BTr>
      </BThead>
      <BTbody>
        <BTr v-for="(item, index) in Data" :key="item._id" class="align-middle">
          <BTd>{{ index + 1 }}</BTd>
          <BTd>{{ item.nomi }}</BTd>
          <BTd>{{ item.soni }}</BTd>
          <BTd>{{ item.ishlabChiqarilganYili }}</BTd>
          <BTd>{{ item.raqami }}</BTd>
          <BTd>{{ item.turi }}</BTd>
          <BTd>{{ item.ishi }}</BTd>
          <BTd>{{ item.depo_id.name }}</BTd>
          <BTd>{{ item.izoh }}</BTd>
          <BTd class="btns">
            <button @click="getOne(item._id)" class="btn btn-primary m-0">
              <i class="bi bi-pen-fill"></i>
            </button>
          </BTd>
          <BTd class="btns">
            <button @click="deleteItem(item._id)" class="btn btn-danger m-0">
              <i class="bi bi-trash-fill"></i>
            </button>
          </BTd>
        </BTr>
      </BTbody>
    </BTableSimple>
    <!-- Table -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const modalCreate = ref(false);
const modalUpdate = ref(false);
const Data = ref([]);
let depos = ref([]);

const FormData = ref({
  id: null,
  nomi: null,
  soni: null,
  ishlabChiqarilganYili: null,
  raqami: null,
  turi: null,
  ishi: null,
  izoh: null,
  depo_id: null,
});

//create
const handleOk = async () => {
  try {
    let res = await axios.post("/metrologiya-sklad/create", FormData.value);
    if (res) {
      getAll();
      modalCreate.value = !modalCreate.value;
      (FormData.value.id = null),
        (FormData.value.nomi = null),
        (FormData.value.soni = null),
        (FormData.value.ishlabChiqarilganYili = null),
        (FormData.value.raqami = null),
        (FormData.value.turi = null),
        (FormData.value.ishi = null),
        (FormData.value.izoh = null),
        (FormData.value.depo_id = null);
    }
  } catch (error) {
    console.error(error);
  }
};

// update
const handleUpdate = async () => {
  let id = FormData.value._id;
  try {
    console.log("ID: " + id);
    let res = await axios.patch("/metrologiya-sklad/update/" + id, FormData.value);
    if (res) {
      getAll();
      modalUpdate.value = !modalUpdate.value;
      (FormData.value.id = null),
        (FormData.value.nomi = null),
        (FormData.value.soni = null),
        (FormData.value.ishlabChiqarilganYili = null),
        (FormData.value.raqami = null),
        (FormData.value.turi = null),
        (FormData.value.ishi = null),
        (FormData.value.izoh = null),
        (FormData.value.depo_id = null);
    }
  } catch (error) {
    console.error(error);
  }
};

//delete
const deleteItem = async (id) => {
  try {
    if (!id) return;
    let confirmDelete = confirm("Tasdiqlaysizmi?");
    if (confirmDelete) {
      try {
        let res = await axios.delete("/metrologiya-sklad/delete/" + id);
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

//getAll
let getAll = async () => {
  try {
    let res = await axios.get("/metrologiya-sklad/all");
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
    let res = await axios.get("/metrologiya-sklad/one/" + id);
    if (res.data) {
      FormData.value = res.data;
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
      console.log(res.data);
      depos = res.data.map(function (depo) {
        return { text: depo.name, value: depo._id };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAll();
  getAllDepos();
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
