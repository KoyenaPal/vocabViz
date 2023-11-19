<script lang="ts">
  import papa from 'papaparse';

  function handleChange(event: any) {
      let files = event.target.files;
      for (let f of files) {
          papa.parse(f, {
              header: true,
              complete: function (results: any) {
                  console.log(results);
              }
          });
      }
  }
</script>



Upload a dataset of your interest:

<input type="file" on:change={handleChange} />