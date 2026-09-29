<script setup>
defineProps({index:{type:Number,default:0}})
</script>
<template><span class="sprite" :style="{'--sx':index%4,'--sy':Math.floor(index/4)}" aria-hidden="true"></span></template>
