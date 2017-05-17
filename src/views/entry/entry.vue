<template>
	<div id="entry">
		<md-theme :md-name="theme">
			<md-card class="card-entry-swiper" >
				<md-card-media>
					<!-- swiper -->

					<swiper :options="swiperOption">
						<swiper-slide v-for="banner in banners"><img :src="banner"></swiper-slide>

						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>

				</md-card-media>
			</md-card>
		</md-theme>

	</div>
</template>

<script>
	import $ from 'n-zepto'

	import swiper from "../../components/common/swiper.vue"
	import slide from "../../components/common/slide.vue"

	export default {
		data () {
			return {
				banners: [ '../../../statics/img/entry/01.jpg', '../../../statics/img/entry/02.jpg', '../../../statics/img/entry/03.jpg', '../../../statics/img/entry/04.jpg'],
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
		mounted() {
			console.log('app init');

			//暂未做头部显示的配置，暂时手动移除navbar
			var el = $('#navbar')[0].childNodes;
			el[0].removeChild(el[0].childNodes[0]);

		},
		created:function(){
			
		},		
		computed: {
			
		},
		methods: {


		},
		components: {
			swiper,
			slide
		}
	}
</script>





<style lang="scss">
	.card-entry-swiper{

		.swiper-container {
			height: 200px;
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

			.swiper-pagination-bullet-active{
				background:red;
			}
		}
	}

	
</style>