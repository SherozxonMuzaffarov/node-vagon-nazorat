<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0"><i class="bi bi-house-door-fill"></i>Tamirga olingan vagonlar</p>
    </div>

    <!-- Modal Repair update -->
    <BModal
      v-model="modalInputDataUpdate"
      @ok.prevent="updateInputData"
      @keyup.enter="updateInputData"
      @cancel="modalInputDataUpdate = !modalInputDataUpdate"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
      size="xl"
      scrollable 
    >
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5 >Yon ramalari (bak.ram) </h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="ramaRight1Year" class="form-label">1-o'ng yon ramasi</label>
          <BFormInput v-model="inputData.ramaRight1Year" id="ramaRight1Year" class="mb-3" placeholder="ishlab chiqarilgan yili" />
          <BFormInput v-model="inputData.ramaRight1Number" id="ramaRight1Number" class="mb-3" placeholder="nameri"/>
        </div>
        <div class="col">
          <label for="ramaRight2Year" class="form-label">2-o'ng yon ramasi</label>
          <BFormInput v-model="inputData.ramaRight2Year" id="ramaRight2Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.ramaRight2Number" id="ramaRight2Number" class="mb-3" placeholder="nameri"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="ramaLeft1Year" class="form-label">1-chap yon ramasi</label>
          <BFormInput v-model="inputData.ramaLeft1Year" id="ramaLeft1Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.ramaLeft1Number" id="ramaLeft1Number" class="mb-3" placeholder="nameri"/>
        </div>
        <div class="col-6">
          <label for="ramaLeft2Year" class="form-label">2-chap yon ramasi</label>
          <BFormInput v-model="inputData.ramaLeft2Year" id="ramaLeft2Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.ramaLeft2Number" id="ramaLeft2Number" class="mb-3" placeholder="nameri"/>
        </div>
      </div>
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5 >Ressor usti balkasi</h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="balka1Year" class="form-label">1-balka</label>
          <BFormInput v-model="inputData.balka1Year" id="balka1Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.balka1Number" id="balka1Number" class="mb-3" placeholder="nameri"/>
        </div>
        <div class="col">
          <label for="balka2Year" class="form-label">2-balka</label>
          <BFormInput v-model="inputData.balka2Year" id="balka2Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.balka2Number" id="balka2Number" class="mb-3" placeholder="nameri"/>
        </div>
      </div>
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5 >G'ildirak juftligi</h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="gildirak1" class="form-label">Gildirak 1</label>
          <BFormInput v-model="inputData.gildirak1" id="gildirak1" class="mb-3" placeholder="tegishliligi (27,29)"/>
          <BFormInput v-model="inputData.gildirak1Number" id="gildirak1Number" class="mb-3" placeholder="nomeri (123456)"/>
        </div>
        <div class="col">
          <label for="gildirak2" class="form-label">Gildirak 2</label>
          <BFormInput v-model="inputData.gildirak2" id="gildirak2" class="mb-3" placeholder="tegishliligi (27,29)" />
          <BFormInput v-model="inputData.gildirak2Number" id="gildirak2Number" class="mb-3" placeholder="nomeri (123456)" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="gildirak3" class="form-label">Gildirak 3</label>
          <BFormInput v-model="inputData.gildirak3" id="gildirak3" class="mb-3" placeholder="tegishliligi (27,29)" />
          <BFormInput v-model="inputData.gildirak3Number" id="gildirak3Number" class="mb-3" placeholder="nomeri (123456)" />
        </div>
        <div class="col">
          <label for="gildirak4" class="form-label">Gildirak 4</label>
          <BFormInput v-model="inputData.gildirak4" id="gildirak4" class="mb-3" placeholder="tegishliligi (27,29)" />
          <BFormInput v-model="inputData.gildirak4Number" id="gildirak4Number" class="mb-3" placeholder="nomeri (123456)" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="inputComment" class="form-label">Izoh</label>
          <BFormInput v-model="inputData.input_comment" id="inputComment" class="mb-3" placeholder="izoh" />
        </div>
      </div>
    </BModal>
    <!-- Modal Repair -->

    <!-- Modal OutPut Data create -->
    <BModal
      v-model="modalOutputData"
      @ok.prevent="handleOutputData"
      @keyup.enter="handleOutputData"
      @cancel="modalOutputData = !modalOutputData"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
      size="xl"
      scrollable 
    >
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5 >Yon ramalari (bak.ram) </h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="ramaRight1Year" class="form-label">1-o'ng yon ramasi</label>
          <BFormInput v-model="inputData.ramaRight1Year" id="ramaRight1Year" class="mb-3" placeholder="ishlab chiqarilgan yili" />
          <BFormInput v-model="inputData.ramaRight1Number" id="ramaRight1Number" class="mb-3" placeholder="nameri"/>
        </div>
        <div class="col">
          <label for="ramaRight2Year" class="form-label">2-o'ng yon ramasi</label>
          <BFormInput v-model="inputData.ramaRight2Year" id="ramaRight2Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.ramaRight2Number" id="ramaRight2Number" class="mb-3" placeholder="nameri"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="ramaLeft1Year" class="form-label">1-chap yon ramasi</label>
          <BFormInput v-model="inputData.ramaLeft1Year" id="ramaLeft1Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.ramaLeft1Number" id="ramaLeft1Number" class="mb-3" placeholder="nameri"/>
        </div>
        <div class="col-6">
          <label for="ramaLeft2Year" class="form-label">2-chap yon ramasi</label>
          <BFormInput v-model="inputData.ramaLeft2Year" id="ramaLeft2Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.ramaLeft2Number" id="ramaLeft2Number" class="mb-3" placeholder="nameri"/>
        </div>
      </div>
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5 >Ressor usti balkasi</h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="balka1Year" class="form-label">1-balka</label>
          <BFormInput v-model="inputData.balka1Year" id="balka1Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.balka1Number" id="balka1Number" class="mb-3" placeholder="nameri"/>
        </div>
        <div class="col">
          <label for="balka2Year" class="form-label">2-balka</label>
          <BFormInput v-model="inputData.balka2Year" id="balka2Year" class="mb-3" placeholder="ishlab chiqarilgan yili"/>
          <BFormInput v-model="inputData.balka2Number" id="balka2Number" class="mb-3" placeholder="nameri"/>
        </div>
      </div>
      <div class="container bg-yellow d-flex justify-content-center text-black">
        <h5 >G'ildirak juftligi</h5>
      </div>
      <div class="row">
        <div class="col">
          <label for="gildirak1" class="form-label">Gildirak 1</label>
          <BFormInput v-model="inputData.gildirak1" id="gildirak1" class="mb-3" placeholder="tegishliligi (27,29)"/>
          <BFormInput v-model="inputData.gildirak1Number" id="gildirak1Number" class="mb-3" placeholder="nomeri (123456)"/>
        </div>
        <div class="col">
          <label for="gildirak2" class="form-label">Gildirak 2</label>
          <BFormInput v-model="inputData.gildirak2" id="gildirak2" class="mb-3" placeholder="tegishliligi (27,29)" />
          <BFormInput v-model="inputData.gildirak2Number" id="gildirak2Number" class="mb-3" placeholder="nomeri (123456)" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="gildirak3" class="form-label">Gildirak 3</label>
          <BFormInput v-model="inputData.gildirak3" id="gildirak3" class="mb-3" placeholder="tegishliligi (27,29)" />
          <BFormInput v-model="inputData.gildirak3Number" id="gildirak3Number" class="mb-3" placeholder="nomeri (123456)" />
        </div>
        <div class="col">
          <label for="gildirak4" class="form-label">Gildirak 4</label>
          <BFormInput v-model="inputData.gildirak4" id="gildirak4" class="mb-3" placeholder="tegishliligi (27,29)" />
          <BFormInput v-model="inputData.gildirak4Number" id="gildirak4Number" class="mb-3" placeholder="nomeri (123456)" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="inputComment" class="form-label">Izoh</label>
          <BFormInput v-model="inputData.input_comment" id="inputComment" class="mb-3" placeholder="izoh" />
        </div>
      </div>
    </BModal>
    <!-- Modal OutPut Data create -->

<!-- List -->
    <div class="mt-5 row">
        <div class="card shadow-sm" style="overflow: auto; white-space: nowrap; height:100vh">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item" v-for="(item) in depos" :key="item.value">
                <a class="nav-link" href="#">{{ item.text }}</a>
              </li>
            </ul>
          </div>
          <div class="card-body table-responsive">
            <div class="align-middle row" >
              <!-- Inner Card -->
              <div class="card shadow-sm m-3 col" style="overflow: auto; white-space: nowrap" v-for="(item) in Data" :key="item._id">
                <div class="card-header ">
                  {{ item.nomer }}
                  {{ item.vagon_type_id?.name }}
                  {{ item.repair_type_id?.name }}
                </div>
                <div class="card-body">
                  <!-- Yon ramalari -->
                  <div>
                    <h6 class="card-title ">Yon ramalari</h6>
                    <div class="row">
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">Nomi</h6> 
                        <p class="card-text my-0">Yili</p>
                        <p class="card-text my-0">Nomeri</p>
                      </div>
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">1-o'ng</h6> 
                        <p class="card-text my-0">{{ item.input_data_id?.ramaRight1Year }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.ramaRight1Number }}</p>
                      </div>
                      <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">2-o'ng </h6> 
                        <p class="card-text my-0 ">{{ item.input_data_id?.ramaRight2Year }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.ramaRight2Number }}</p>
                      </div>
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">1-chap</h6> 
                        <p class="card-text my-0">{{ item.input_data_id?.ramaLeft1Year }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.ramaLeft1Number }}</p>
                      </div>
                      <div class="col">
                      <h6 class="card-subtitle mb-2 text-body-secondary">2-chap</h6> 
                        <p class="card-text my-0 ">{{ item.input_data_id?.ramaLeft2Year }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.ramaLeft2Number }}</p>
                      </div>
                      
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">1-balka</h6> 
                        <p class="card-text my-0">{{ item.input_data_id?.balka1Year }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.balka1Number }}</p>
                      </div>
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">2-balka</h6> 
                        <p class="card-text my-0">{{ item.input_data_id?.balka2Year }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.balka2Number }}</p>
                      </div>
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">Nomi</h6> 
                        <p class="card-text my-0">Tegishliligi</p>
                        <p class="card-text my-0">Nomeri</p>
                      </div>
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 1</h6> 
                        <p class="card-text my-0">{{ item.input_data_id?.gildirak1 }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.gildirak1Number }}</p>
                      </div>
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 2</h6> 
                        <p class="card-text my-0">{{ item.input_data_id?.gildirak2 }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.gildirak2Number }}</p>
                      </div>
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 3</h6> 
                        <p class="card-text my-0">{{ item.input_data_id?.gildirak3 }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.gildirak3Number }}</p>
                      </div>
                      <div class="col">
                        <h6 class="card-subtitle mb-2 text-body-secondary">g'ildirak 4</h6> 
                        <p class="card-text my-0">{{ item.input_data_id?.gildirak4 }}</p>
                        <p class="card-text my-0">{{ item.input_data_id?.gildirak4Number }}</p>
                      </div>
                    </div>
                  </div>
                  <!-- G'ildirak juftliklari -->                        
                </div>
                <div class="card-footer">
                  <button @click="getOne(item.input_data_id?._id)" class="btn btn-primary m-0">
                    <i class="bi bi-pen-fill"></i>
                  </button>
                  <button @click="addOutputData(item.input_data_id?.vagon_id)" class="btn btn-success m-0">
                    <i class="bi bi-arrow-up-right-square-fill"></i>
                  </button>
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
              </div>

              {{ Data }}
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import axios from "axios";
const modalInputDataUpdate = ref(false);
const modalOutputData = ref(false);
const Data = ref([]);

let depos = ref([]);

const inputData = ref({
  vagon_id: null,

  ramaRight1Year: null,
  ramaRight1Number: null,

  ramaRight2Year: null,
  ramaRight2Number: null,

  ramaLeft1Year: null,
  ramaLeft1Number: null,

  ramaLeft2Year: null,
  ramaLeft2Number: null,

  balka1Year: null,
  balka1Number: null,

  balka2Year: null,
  balka2Number: null,

  gildirak1: null,
  gildirak1Number: null,

  gildirak2: null,
  gildirak2Number: null,

  gildirak3: null,
  gildirak3Number: null,

  gildirak4: null,
  gildirak4Number: null,

  input_comment: null,
});


//getAllVagon
let getAll = async () => {
  try {
    let res = await axios.get("/vagon-input-data/all");
    if (res.data) {
      Data.value = res.data;
      console.log(res.data);
    }
  } catch (error) {
    console.error(error);
  }
};

// getOne;
let getOne = async (id) => {
  try {
    let res = await axios.get("/vagon-input-data/one/" + id);
    if (res.data) {
      inputData.value = res.data;
      modalInputDataUpdate.value = !modalInputDataUpdate.value;
    }
  } catch (error) {
    console.error(error);
  }
};

const makeInputDataNull = () => {
  inputData.value.vagon_id = null;

  inputData.value.ramaRight1Year = null;
  inputData.value.ramaRight1Number = null;

  inputData.value.ramaRight2Year = null;
  inputData.value.ramaRight2Number = null;

  inputData.value.ramaLeft1Year = null;
  inputData.value.ramaLeft1Number = null;

  inputData.value.ramaLeft2Year = null;
  inputData.value.ramaLeft2Number = null;

  inputData.value.balka1Year = null;
  inputData.value.balka1Number = null;

  inputData.value.balka2Year = null;
  inputData.value.balka2Number = null;

  inputData.value.gildirak1 = null;
  inputData.value.gildirak1Number = null;

  inputData.value.gildirak2 = null;
  inputData.value.gildirak2Number = null;

  inputData.value.gildirak3 = null;
  inputData.value.gildirak3Number = null;

  inputData.value.gildirak4 = null;
  inputData.value.gildirak4Number = null;

  inputData.value.input_comment = null;
};


//Create Input Data
const updateInputData = async () => {
  try {
    console.log("inputData.value " + inputData.value);
    let res = await axios.patch(`/vagon-input-data/update/${inputData.value._id}`, inputData.value);
    if (res.data) {
      modalInputDataUpdate.value = !modalInputDataUpdate.value;
      makeInputDataNull()
      getAll()
    }
  } catch (error) {
    console.error(error);
  }
};

// addInputData;
let addOutputData = async (id) => {
  inputData.value.vagon_id = id
  modalOutputData.value = !modalOutputData.value
};

// Create OutPut Data
const handleOutputData = async () => {
  try {
    let res = await axios.post("/vagon-output-data/create/", inputData.value);
    if (res) {
      getAll();
      modalOutputData.value = !modalOutputData.value;
      makeInputDataNull()
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
