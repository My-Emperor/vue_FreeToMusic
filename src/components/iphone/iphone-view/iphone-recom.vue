<template>
  <div class="recom-box">
    <var-swipe class="swipe-example">
      <var-swipe-item>
        <img class="swipe-example-image">
        <!--  src="https://varlet-varletjs.vercel.app/cat.jpg"-->
      </var-swipe-item>
      <var-swipe-item>
        <img class="swipe-example-image">
        <!--  src="https://varlet-varletjs.vercel.app/cat2.jpg"-->
      </var-swipe-item>
      <var-swipe-item>
        <img class="swipe-example-image">
        <!--  src="https://varlet-varletjs.vercel.app/cat3.jpg"-->
      </var-swipe-item>
    </var-swipe>
    <module-box title="推荐歌单">
      <div class="recom-sheet">
        <div class="recom-sheet-scroll">
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>
          <song-sheet-box class="sheet-box" imgUrl="https://varlet-varletjs.vercel.app/cat.jpg"
                          text="测试图片"></song-sheet-box>

        </div>
      </div>
    </module-box>

    <module-box title="推荐歌曲">
      <div class="recom-music">
        <music-box musicImageUrl="" title="题目" singer="测试"></music-box>
        <music-box musicImageUrl="" title="题目" singer="测试"></music-box>
        <music-box musicImageUrl="" title="题目" singer="测试"></music-box>
        <music-box musicImageUrl="" title="题目" singer="测试"></music-box>
      </div>
    </module-box>

    <module-box title="推荐歌手">
      <div class="recom-singer">
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
        <singer-box singerImageUrl="" singer="题目" ></singer-box>
      </div>
    </module-box>
  </div>
</template>

<script>

import moduleBox from '@/components/iphone/iphone-component/module-box'
import songSheetBox from '@/components/iphone/iphone-component/song-sheet-box'
import musicBox from '@/components/iphone/iphone-component/music-box'
import singerBox from '@/components/iphone/iphone-component/singer-box'

export default {
  name: "iphone-recom",
  components: {
    moduleBox,
    songSheetBox,
    musicBox,
    singerBox
  },
  setup() {
    // 注册模块组件

  },
}
</script>

<style lang="scss" scoped>
.recom-box {
  width: 100%;
  background-color: #f3f3f3;
  .swipe-example {
    height: 160px;

    .swipe-example-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      background-color: pink;
    }
  }

  .recom-sheet {
    display: flex;
    padding: 0 20px;
    width: 375px;
    overflow-x: scroll;

    .recom-sheet-scroll {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      flex-shrink: 0;
      width: 100%;

      .sheet-box {
        flex-shrink: 0;
        margin: 4px;
      }
    }
  }

  .recom-music {
    display: flex;
    flex-direction: column;

    .recom-music-item {
      padding: 20px;
      background-color: pink;
    }
  }

  .recom-singer{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 6px;
  }
}
</style>