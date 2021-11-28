<template>
  <div
    class="w-full h-40 border-dashed border-4 border-gray-400"
    data-cy="upload-image"
    :class="isDragActive && 'border-gray-800'"
    accept="image/png, image/gif, image/jpeg"
    @dragenter.prevent="dragActive"
    @dragleave.prevent="dragInactive"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <div class="grid justify-center items-center w-full min-h-full h-32">
      <Dropicon
        class="fill-current text-gray-400 place-self-end w-48"
        :class="isDragActive && 'fill-current text-gray-800'"
      />
      <div
        class="min-w-min text-center text-gray-400"
        :class="isDragActive && 'text-gray-800'"
      >
        {{ isDragActive ? 'Release to upload...' : 'Drag and drop here or' }}
      </div>
      <label
        for="dropzoneFile"
        class="cursor-pointer bg-gray-400 text-gray1 px-3 py-1.5 mt-2 place-self-center self-start"
        :class="isDragActive && 'bg-gray-800'"
      >select image</label>
    </div>
    <input
      id="dropzoneFile"
      type="file"
      class="hidden"
      @input="upload"
    >
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { store } from '@/stores/store';
import Card from '@/typings/card';
import Dropicon from '@/assets/icons/dropicon.svg';
export default defineComponent({
  name: 'Dropzone',
  components: {
    Dropicon
  },
  props: {
    card: {
      default: null,
      type: Object as PropType<Card>
    }
  },
  setup() {
    const uploadFile = store().uploadFile;
    const activeCard = store().activeCard;
    const isDragActive = ref(false);

    const dragActive = () => {
      isDragActive.value = true
    };

    const dragInactive = () => {
      isDragActive.value = false
    };
    const drop = (e: any) => {
      const acceptedFile = e.dataTransfer.files[0];
      uploadFile(activeCard, acceptedFile);
      dragInactive()
    };

    const upload = (e: any) => {
      const acceptedFile = e.target.files[0];
      uploadFile(activeCard, acceptedFile);
    }

    return { isDragActive, dragActive, dragInactive, drop, upload };
  }
});
</script>