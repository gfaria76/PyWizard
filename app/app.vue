<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'pt-BR',
    class: 'dark',
  },
  titleTemplate: (title) => title ? `${title} | CodeGrimoire` : 'CodeGrimoire',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'description',
      content: 'RPG tecno-arcano para aprender programação com Python.',
    },
  ],
})
</script>
