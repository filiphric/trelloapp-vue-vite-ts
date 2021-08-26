<template>
  <div class="w-full h-32 border-dashed border-4 border-gray-400 flex cursor-pointer" data-cy="upload-image" :class="isDragActive && 'border-gray-800'">
    <div v-bind="getRootProps()" class="w-full h-full">
      <input v-bind="getInputProps()" />
      <div class="flex justify-center items-center w-full min-h-full h-32">
        <Dropicon class="fill-current text-gray-400 mr-3" :class="isDragActive && 'text-gray-800'" />
        <div v-if="isDragActive" class="min-w-min text-center text-gray-800">Release to upload...</div>
        <div v-else class="min-w-min text-center text-gray-400" :class="isDragActive && 'text-gray-800'">Drop file here or click to upload</div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/stores/store';
import { useDropzone } from 'vue3-dropzone';
import Dropicon from '@/assets/icons/dropicon.svg';
export default {
  name: 'UseDropzoneDemo',
  components: {
    Dropicon
  },
  props: ['card'],
  setup(props) {
    const state = store();
    function onDrop(acceptFiles) {
      state.uploadFile(acceptFiles, props.card);
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    return {
      getRootProps,
      getInputProps,
      ...rest
    };
  }
};
</script>
