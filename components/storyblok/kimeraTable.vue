<template>
  <div class="kimera-table">
    <table>
      <thead class="kimera-text-filter-tags">
        <tr>
          <th v-for="th in blok.table.thead">{{ th.value }}</th>
        </tr>
      </thead>
      <tbody class="kimera-text">
        <tr v-for="tr in blok.table.tbody">
          <td v-for="td in tr.body">{{ td.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
td {
  width: 50%;
}
tr,
table {
  width: 100%;
}

th {
  text-align: left;
}
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  break-inside: avoid-column;
}
.kimera-table {
  padding-top: 1rem;
}
</style>
