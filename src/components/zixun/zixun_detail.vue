<template>
	<div id="zixun-detail">
		<md-theme :md-name="theme">
			<headerBack :title="zixunDetail.title"></headerBack>
			<md-spinner :md-size="60" md-indeterminate v-show='spinnerFlag'></md-spinner>
			<md-card class="card-zixun-detail" v-show='!spinnerFlag'>				
				<md-card-header>
					<h2 class="md-title">{{zixunDetail.title}}</h2>
				</md-card-header>
				<md-card-content>
					<div class="card-reservation direction">
						
					</div>
				</md-card-content>
			</md-card>
		</md-theme>  
	</div>
</template>
<script>
	import headerBack from "../common/header_back.vue"
	import axios from 'axios'
	export default {
		data(){
			return{
				newsId: this.$route.params.id,
				zixunDetail: {},
				spinnerFlag: true
			}
		},
		computed: {
			theme(){
				return this.$store.getters.THEME_COLOR
			}
		},
		mounted: function(){
			this.reqzixunDetail();
		},
		methods: {
			reqzixunDetail(){
				axios.get(API_PROXY+'http://www.dajiang365.com/mobilezixun/detailsnp?id='+this.newsId)
				.then(function(res) {
					this.zixunDetail = res.data.data.id ? res.data.data : JSON.parse(res.request.response.data);
					document.querySelector(".card-reservation").innerHTML = this.zixunDetail.content;
					this.spinnerFlag = false;
				}.bind(this))
				.catch(function(error){
					console.log(error);
				});
			}
		},
		components: {
			headerBack
		}
	}
</script>
<style lang="scss" scoped>
	.card-zixun-detail {
		margin-top: 72px;
		.md-subhead {
			.md-icon {
				$size: 16px;

				width: $size;
				min-width: $size;
				height: $size;
				min-height: $size;
				font-size: $size;
				line-height: $size;
			}

			span {
				vertical-align: middle;
			}
		}

		.card-reservation {
			margin-top: 8px;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.md-icon {
				margin: 8px;
				color: rgba(#000, .54) !important;
			}

			.md-button {
				border-radius: 2px !important;
			}
		}

		.card-reservation.direction{
			flex-direction: column;
			text-align: left;
		}
	}
	.md-spinner{
		margin-top: 72px;
	}
</style>