<script lang="ts">
  const { children } = $props();
</script>

<main class="container">
  <section class="content">
    {@render children()}
  </section>

  <div class="side-image">
    <enhanced:img
      src="../../lib/assets/images/side-img.webp"
      alt=""
      sizes="(min-width: 56.25rem) 50vw, 10px"
      fetchpriority="high"
    />
  </div>
</main>

<style>
  .container {
    display: flex;
    height: 100%;
    container-type: inline-size;
  }

  .content {
    display: flex;
    justify-content: center;
    padding-top: 13.5rem;
    flex: 1;
  }

  .side-image {
    display: none;
  }

  @container (min-width: 56.25rem) {
    .side-image {
      display: block;
      width: 50%;

      & :global(img) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
