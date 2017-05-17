<template>
	<div id="entry">

		<md-card class="card-entry-swiper" >
			<md-card-media>
				<!-- swiper -->
				<swiper :options="swiperOption" class="swiper-box">
					<swiper-slide>Slide 1</swiper-slide>
					<swiper-slide>Slide 2</swiper-slide>
					<swiper-slide>Slide 3</swiper-slide>
					<swiper-slide>Slide 4</swiper-slide>
					<swiper-slide>Slide 5</swiper-slide>
					<swiper-slide>Slide 6</swiper-slide>
					<swiper-slide>Slide 7</swiper-slide>
					<swiper-slide>Slide 8</swiper-slide>
					<swiper-slide>Slide 9</swiper-slide>
					<swiper-slide>Slide 10</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
					<div class="swiper-button-prev" slot="button-prev"></div>
					<div class="swiper-button-next" slot="button-next"></div>
				</swiper>
			</md-card-media>
		</md-card>

	</div>
</template>

<script>
	import swiper from "../../components/common/swiper.vue"
	import slide from "../../components/common/slide.vue"

	export default {
		data() {
			return {
				swiperOption: {
					pagination: '.swiper-pagination',
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					paginationClickable: true,
					spaceBetween: 30,
					centeredSlides: true,
					autoplay: 2500,
					autoplayDisableOnInteraction: false
				}
			}
		},
		components: {
			swiper,
			slide
		}
	}
</script>





<style lang="scss">
	.card-entry-swiper{
		margin-top:72px;

		.swiper-container {
			height: 300px;
			width: 100%;
			
			.swiper-slide {
				text-align: center;
				font-size: 38px;
				font-weight: 700;
				background-color: #eee;
				display: -ms-flexbox;
				display: flex;
				-ms-flex-pack: center;
				justify-content: center;
				-ms-flex-align: center;
				align-items: center;
			}
		}
	}

	
</style>