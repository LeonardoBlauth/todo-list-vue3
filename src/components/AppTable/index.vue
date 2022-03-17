<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Column from "primevue/column";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import TableBadges from "./TableBadges.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      tasks: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        task: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        category: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
      },
      loading: true,
      categories: ["Home", "School", "Health", "Leisure"],
    };
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    getTasks() {
      this.axios
        .get("tasks")
        .then(res => {
          this.tasks = res.data;
        })
        .then(() => {
          console.table(this.tasks);
          this.loading = false;
        });
    },

    formatDate(value: Date) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    clearFilter() {
      this.initFilters();
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        task: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        category: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
      };
    },

    verifiedIconColor(verified: boolean) {
      return verified ? "green" : "red";
    },
  },
};
</script>

<template>
  <DataTable
    :value="tasks"
    :paginator="true"
    removableSort
    class="p-datatable-task"
    :rows="10"
    dataKey="id"
    :rowHover="true"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 25, 50]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    :globalFilterFields="['task', 'category', 'status']"
    responsiveLayout="stack"
    breakpoint="767px"
  >
    <div
      class="flex flex-row justify-content-between align-items-center bg-white mb-3"
    >
      <h5 class="m-0 fw-bold">Tasks</h5>
      <div class="ms-5">
        <div class="input-group d-md-none">
          <span class="input-group-text bg-white border-end-0" id="icon-search">
            <font-awesome-icon icon="magnifying-glass" />
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="icon-search"
          />
        </div>
        <Button
          type="button"
          class="p-button-outlined p-button-success d-none d-md-inline"
          @click="clearFilter()"
          ><font-awesome-icon icon="plus"
        /></Button>
        <Button
          type="button"
          class="p-button-outlined p-button-danger d-none d-md-inline ms-3"
          @click="clearFilter()"
          ><i class="pi pi-filter-slash"></i
        ></Button>
      </div>
    </div>
    <template #empty> No tasks found. </template>
    <template #loading> Loading tasks data. Please wait. </template>
    <Column field="task" header="Task">
      <template #body="{ data }">
        {{ data.task }}
      </template>
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by task"
        />
      </template>
    </Column>
    <Column
      field="category"
      header="Category"
      sortable
      :showFilterMatchModes="false"
      :filterMenuStyle="{ width: '14rem' }"
      bodyStyle="text-align: center"
    >
      <template #body="{ data }">
        <span class="task-badge">{{ data.category }}</span>
      </template>
      <template #filter="{ filterModel }">
        <Dropdown
          v-model="filterModel.value"
          :options="categories"
          placeholder="Any"
          class="p-column-filter"
          :showClear="true"
        >
          <template #value="slotProps">
            <span class="task-badge">{{ slotProps.value }}</span>
          </template>
          <template #option="slotProps">
            <span class="task-badge">{{ slotProps.option }}</span>
          </template>
        </Dropdown>
      </template>
    </Column>
    <Column
      field="status.label"
      header="Status"
      sortable
      :showFilterMatchModes="false"
      :filterMenuStyle="{ width: '14rem' }"
      bodyStyle="text-align: center"
    >
      <template #body="{ data }">
        <TableBadges
          :badgeClass="'task-badge status-' + data.status.style"
          :label="data.status.label"
        />
      </template>
      <!-- <template #filter="{ filterModel }">
        <Dropdown
          v-model="filterModel.value"
          :options="statuses"
          placeholder="Any"
          class="p-column-filter"
          :showClear="true"
        >
          <template #value="slotProps">
            <TableBadges
              :badgeClass="'task-badge status-' + slotProps.value"
              :label="slotProps.value"
            />
          </template>
          <template #option="slotProps">
            <TableBadges
              :badgeClass="'task-badge status-' + slotProps.option"
              :label="slotProps.option"
            />
          </template>
        </Dropdown>
      </template> -->
    </Column>
    <Column
      field="date"
      header="Date"
      sortable
      dataType="date"
      bodyStyle="text-align: center"
    >
      <template #body="{ data }">
        {{ data.start_date }} - {{ data.end_date }}
      </template>
      <template #filter="{ filterModel }">
        <Calendar
          v-model="filterModel.value"
          dateFormat="mm/dd/yy"
          placeholder="mm/dd/yyyy"
        />
      </template>
    </Column>
    <Column
      field="state"
      header="State"
      dataType="boolean"
      bodyStyle="text-align: center"
    >
      <template #body="{ data }">
        <i
          class="pi"
          :class="{
            'true-icon pi-check-circle': data.state,
            'false-icon pi-times-circle': !data.state,
          }"
          :style="{
            color: verifiedIconColor(data.state),
          }"
        ></i>
      </template>
    </Column>
    <Column header="Options" bodyStyle="text-align: center; overflow: visible">
      <template #body>
        <Button
          type="button"
          icon="pi pi-cog"
          class="p-button-rounded p-button-secondary p-button-flat"
        ></Button>
      </template>
    </Column>
  </DataTable>
</template>

<style lang="scss" scoped>
::v-deep(.p-paginator) .p-paginator-current {
  margin-left: auto;
}
::v-deep(.p-datepicker) {
  min-width: 25rem;
}
::v-deep(.p-datepicker) td {
  font-weight: 400;
}
::v-deep(.p-datatable.p-datatable-task) .p-datatable-header {
  padding: 1rem;
  text-align: left;
  font-size: 1.5rem;
}
::v-deep(.p-datatable.p-datatable-task) .p-paginator {
  padding: 1rem;
}
::v-deep(.p-datatable.p-datatable-task) .p-datatable-thead > tr > th {
  text-align: left;
}
::v-deep(.p-datatable.p-datatable-task) .p-datatable-tbody > tr > td {
  cursor: auto;
  text-align: left;
}
::v-deep(.p-datatable.p-datatable-task) .p-dropdown-label:not(.p-placeholder) {
  text-transform: uppercase;
}

.task-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
</style>
