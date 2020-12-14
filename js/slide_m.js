$(function(){
	if($('body').find('.slide-wrap'))
		{
		$('.slide-wrap').append('<div class="slide-container"></div><ul class="indicator"></ul><div class="con-btn prev-btn"></div><div class="con-btn next-btn"></div>');
		$('.slide-wrap').after('<ul class="thumnail-box" style="position:relative;box-sizing:border-box;min-width:720px;height:100px;overflow:hidden;border:0px solid #000;background:#333;margin-top:0px;"></ul>');
		var mswidth;
		var msheight;
		var article_height;
		var wrapwidth;
		var dragindex;
		var class_slide;
		var sort_index;
		var app_sort;
		var slideNum=0;
		var jsonLocation = './data/slide_data.json';
		var sort_slide;
		var item_img;
		var thum_width;
		$.getJSON(jsonLocation, function(data){
			$.each(data, function(I, item){
				slideNum++;
				$('.slide-container').append('<div class="slide slide'+slideNum+'" data-index="'+slideNum+'"><video play controls poster="'+item.img_url+'" preload="auto" alt="'+item.alt_text+slideNum+'"><source src="'+item.video_url+'" type="video/mp4">'+item.alt_text+'</video></div>');
				// $('.indicator').append('<li class="bulet bulet'+slideNum+'" data-index="'+slideNum+'">●</li>');
				$('.thumnail-box').append('<li class="thumnail thumnail'+slideNum+'" data-index="'+slideNum+'"><img src='+item.img_url+' alt="미리보기'+slideNum+'" style="width:100%;"></li>');
				$('.bulet').css({'color':'#ccc'});
				$('.bulet1').css({'color':'#999'});
				mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
				$(document).ready(function(){
					thum_width = 100/8;
					$('.thumnail').children('img').css({'border':'2px solid #000','display':'block','float':'left','width':'calc('+thum_width+'% - 24px)','max-width':'142px','max-height':'80px','margin':'10px','cursor':'pointer'});
					$('.thumnail1').children('img').css({'border':'2px solid #ccc'});
				});
				for (var i=0;i<mswidth;i++)/*.slide의 배열이 늘어나면 알아서 아이디와 레프트값 연산 및 .indicator의 btn도 배열 갯수만큼 append*/
				{
					var t=i+1;
					sort_slide=i*100;
					$('.slide'+t).css({'left':sort_slide+'%'});
				};
			});
			//--이미지 로드와의 시간차로 height가 느리게 잡히는 것을 강제로 끌어내어 처음부터 height값 강제 적용.
			function lazy_0(){
				if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
					$(document).ready(function(){
							// if ($('body').width>720){
							// 	msheight = $('.slide').children('video').height()+100;
							// }
							// else{
							// 	msheight = '100vh';
							// }
							msheight = $('.slide').children('video').height()+100;
							article_height = $('.article').height();
							$('.slide-wrap').css({'height':msheight,'max-height':article_height});
						}
					);
				};
			};
			if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
				setInterval(lazy_0,0);
			};
			//-----
			function con_btn_hidden(){
				if(parseInt($('.slide-wrap').css('width'))<480){
					$('.prev-btn, .next-btn').css({'z-index':'-1'})
				}else{
					$('.prev-btn, .next-btn').css({'z-index':'2'})
				}
			}
			// setTimeout(con_btn_hidden,0);
			mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
			s_width = $('.slide').width();
			var sort_all;
			var move;
			var autospeed = 2000;
			var barspeed = autospeed-200;
			var movespeed = 100;
			var boundspeed = 100;
			var framespeed = 1000/60;
			class_slide = document.getElementsByClassName('slide');
			sort_index = $('.slide, .bulet').data('index');
			app_sort = mswidth+1;

			// if ($('body').width>720){
			// 	msheight = $('.slide').children('video').height()+100;
			// }
			// else{
			// 	msheight = '100vh';
			// }
			msheight = $('.slide').children('video').height()+100;

			$(window).resize(function(){
				var delay_time;
				if(!delay_time){
					delay_time = setTimeout(function() {
						delay_time=null;
						// if ($('body').width>720){
						// 	msheight = $('.slide').children('video').height()+100;
						// }
						// else{
						// 	msheight = '100vh';
						// }
						msheight = $('.slide').children('video').height()+100;
						var mswidth = $('.slide').each(Array).length;/*-슬라이드 전체 배열의 갯수만큼의 숫자를 추출-*/
						wrapwidth = mswidth*100;
						s_width = $('.slide').width();
						article_height = $('.article').height();
						$('.slide-wrap').css({'height':msheight,'max-height':article_height});
					},framespeed);
				}
			});

			// console.log(sort_index);
			// page();
			// controll();
			function nextBtn(){
				// console.log('app_sort = '+app_sort);
				if(sort_index<mswidth){
					sort_index++;
					move=(sort_index-1)*-100;
					$('.slide-container').stop().animate({'left':move+'%','transition-timing-function':'linear'},movespeed);
				}else{
					sort_index=1;
					move=(sort_index-1)*-100;
					$('.slide-container').stop().animate({'left':move+'%','transition-timing-function':'linear'},movespeed);
				}
				bullet_on();
				// page();
				thumnail_on();
				// inner_controll_s();
				//sort_all = parseInt($('.slide').data('index'));
				video_pause();
			};

			function prevBtn(){
				if(sort_index>0&&move<0){
					// console.log('before = '+move+' / sort = '+sort_index);
					sort_index--;
					move=(sort_index-1)*-100;
					$('.slide-container').stop().animate({'left':move+'%','transition-timing-function':'linear'},movespeed);
				}else{
					sort_index=mswidth;
					move=(sort_index-1)*-100;
					$('.slide-container').stop().animate({'left':move+'%','transition-timing-function':'linear'},movespeed);
				}
				bullet_on();
				// page();
				thumnail_on();
				// inner_controll_s();
				video_pause();
			};

			function stop_next(){
				clearTimeout(nextBtn);
			}
			function stop_prev(){
				clearTimeout(prevBtn);
			}

			$('.prev-btn').on('mouseover mouseout click',function(event){
				// event.preventDefault();
				// event.stopPropagation();
				// stop_s();
				// stop_bar();
				if (event.type=='mouseover')
				{
					// event.preventDefault();
					// event.stopPropagation();
					// stop_s();
					// stop_bar();
					// inner_controll_p();
				}else if (event.type=='mouseout')
				{
					// start_s();
					// startbar();
					// inner_controll_s();
				}
				else if (event.type=='click')
				{
					// event.preventDefault();
					// event.stopPropagation();
					// setTimeout(stop_bar,0);
					// setTimeout(stop_s,0);
					// setTimeout(stop_next,0);
					prevBtn();
					// setTimeout(startbar,0);
					// setTimeout(start_s,0);
				}
			});

			$('.next-btn').on('mouseover mouseout click',function(event){
				// event.preventDefault();
				// event.stopPropagation();
				// stop_s();
				// stop_bar();
				if (event.type=='mouseover')
				{
					// event.preventDefault();
					// event.stopPropagation();
					// stop_s();
					// stop_bar();
					// inner_controll_p();
				}else if (event.type=='mouseout')
				{
					// start_s();
					// startbar();
					// inner_controll_s();
				}
				else if (event.type=='click')
				{
					// event.preventDefault();
					// event.stopPropagation();
					// setTimeout(stop_bar,0);
					// setTimeout(stop_s,0);
					// setTimeout(stop_prev,0);
					nextBtn();
					// setTimeout(startbar,0);
					// setTimeout(start_s,0);
				}
			});

			$('.slide').on('touchstart touchmove touchend touchcancle click mouseover mouseleave',function(event){
				cal_width = s_width*0.5;
				cal_height = msheight*0.2;
				var dragmove;
				var slideNum;
				var updown;
				var tvalue;
				var yvalue;

				/*swipe 이벤트 시작*/
				if (event.type=='touchstart')
				{
					event.preventDefault();
					event.stopPropagation();
					tstart=event.originalEvent.touches[0].pageX;
					ystart=event.originalEvent.touches[0].pageY;
					// tstart=event.originalEvent.targetTouches[0].pageX;
					// ystart=event.originalEvent.targetTouches[0].pageY;
					// stop_s();
					// stop_bar();
				}
				else if (event.type=='touchmove'){
					event.preventDefault();
					event.stopPropagation();
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;
					tvalue = tstart-tmove;
					yvalue = ystart-ymove;

					// stop_s();
					// stop_bar();

					slideNum =$('.slide').css('width').replace('px', '');
					mswidth = $('.slide').each(Array).length;
					sort_index = $(this).index();
					sort_floor=Math.floor(sort_index);
					app_left = (app_sort-1)*100;
					app_right = -100;
					move=(sort_index)*-100;
					drag_return=(sort_floor)*-100;
					dragmove = (tvalue/slideNum)*-100;
					updown=move+dragmove;
					if(updown!==drag_return){
						// console.log('append = '+mswidth);
						if(sort_index==mswidth-1){
							// console.log('append in = '+sort_index);
							$('.slide-container').append('<div class="slide slide'+app_sort+'" data-index="'+app_sort+'" style="left:'+app_left+'%"></div>')
							$('.slide1 img').clone().appendTo('.slide'+app_sort);
						}
						else if(sort_index==0){
							// console.log('prepend in mswidth = '+mswidth);
							if(mswidth<app_sort){
								$('.slide-container').append('<div class="slide slide'+app_sort+'" data-index="'+app_sort+'" style="left:'+app_right+'%"></div>')
								$('.slide'+mswidth).children('img').clone().appendTo('.slide'+app_sort);
							}
						};
					}
					if(yvalue>cal_height){
						$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
					}else if(yvalue<cal_height){
						if((yvalue*-1)>cal_height){
							$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
						}
					}
					$('.slide-container').css({'left':updown+'%'});
				}
				else if (event.type=='touchend')
				{
					event.preventDefault();
					event.stopPropagation();
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;
					tvalue = tstart-tmove;
					yvalue = ystart-ymove;
					slideNum = $('.slide').css('width').replace('px', '');
					mswidth = $('.slide').each(Array).length;
					sort_index = $(this).index();
					sort_floor=Math.floor(sort_index);
					move=(sort_index)*-100;
					drag_return=(sort_floor)*-100;
					dragmove = (tvalue/slideNum)*-100;
					updown=move+dragmove;
					// console.log(tvalue-cal_width);
					console.log(app_sort);
					$('.slide'+app_sort).remove('');
					mswidth = $('.slide').each(Array).length;
					// stop_s();
					// stop_bar();
					nextBtn();
					if (tvalue>cal_width){
						//$('.next-btn').stop().click();
						nextBtn();
						// console.log('next = '+tvalue+' / mswidth = '+mswidth+' / sort_index = '+sort_index);
					}else if(tvalue<-cal_width){
						stop_next();
						//$('.prev-btn').stop().click();
						prevBtn();
						// console.log('move = '+move);
					}
					else if(tvalue<cal_width&&tvalue>0){
						if(updown!==drag_return){
							// console.log('app_sort = '+app_sort);
							// console.log('dragmove = '+dragmove+' / move = '+move+' / drag_return'+drag_return);
							$('.slide-container').stop().animate({'left':drag_return+'%'},boundspeed);
						}
					}else if(tvalue>-cal_width&&tvalue<0){
						if(updown!==drag_return){
							$('.slide-container').stop().animate({'left':drag_return+'%'},boundspeed);
						}
					}else if(tvalue==0){
						if(yvalue==0){
							click_move();
						}else{
							if(yvalue>cal_height){
								$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
							}else if(yvalue<cal_height){
								if((yvalue*-1)>cal_height){
									$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
								}
							}
						}
					}
					$('.slide'+app_sort).remove('');
					// start_s();
					// startbar();
				}
				else if (event.type=='touchcancle')
				{
					event.preventDefault();
					event.stopPropagation();
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;
					tvalue = tstart-tmove;
					yvalue = ystart-ymove;
					slideNum = $('.slide').css('width').replace('px', '');
					mswidth = $('.slide').each(Array).length;
					sort_index = $(this).index();
					sort_floor=Math.floor(sort_index);
					move=(sort_index)*-100;
					drag_return=(sort_floor)*-100;
					dragmove = (tvalue/slideNum)*-100;
					updown=move+dragmove;
					// console.log(tvalue-cal_width);
					$('.slide'+app_sort).remove('');
					mswidth = $('.slide').each(Array).length;
					// stop_s();
					// stop_bar();
					nextBtn();
					if (tvalue>cal_width){
						// $('.next-btn').stop().click();
						nextBtn();
						// console.log('next = '+tvalue+' / mswidth = '+mswidth+' / sort_index = '+sort_index);
					}else if(tvalue<-cal_width){
						stop_next();
						// $('.prev-btn').stop().click();
						prevBtn();
						// console.log('move = '+move);
					}
					else if(tvalue<cal_width&&tvalue>0){
						if(updown!==drag_return){
							// console.log('app_sort = '+app_sort);
							// console.log('dragmove = '+dragmove+' / move = '+move+' / drag_return'+drag_return);
							$('.slide-container').stop().animate({'left':drag_return+'%'},boundspeed);
						}
					}else if(tvalue>-cal_width&&tvalue<0){
						if(updown!==drag_return){
							$('.slide-container').stop().animate({'left':drag_return+'%'},boundspeed);
						}
					}else if(tvalue==0){
						if(yvalue==0){
							click_move();
						}else{
							if(yvalue>cal_height){
								$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
							}else if(yvalue<cal_height){
								if((yvalue*-1)>cal_height){
									$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
								}
							}
						}
					}
					$('.slide'+app_sort).remove('');
					// start_s();
					// startbar();
				}
				else if (event.type=='mouseover')
				{
					// stop_s();
					// stop_bar();
					// inner_controll_p();
				}
				else if (event.type=='mouseleave')
				{
					// start_s();
					// startbar();
					// inner_controll_s();
				}
				else if(event.type=='click'){
					event.preventDefault();
					event.stopPropagation();
					// setTimeout(stop_s,0);
					// setTimeout(stop_bar,0);
					click_move();
					// start_s();
					// startbar();
				};
				return false;
			});

			function bullet_next(){
				setTimeout(nextBtn,autospeed);
			}
			$('.bulet').on('click mouseover mouseleave',function(event){
				if (event.type=='click')
				{
					// setTimeout(stop_bar,0);
					// setTimeout(stop_s,0);
					sort_index = $(this).data('index');
					move=(sort_index-1)*-100;
					bullet_on();
					// page();
					thumnail_on();
					$('.slide-container').stop().animate({'left':move+'%'},movespeed);
					// inner_controll_s();
					// setTimeout(startbar,0);
					// setTimeout(start_s,0);
				}
				else if (event.type=='mouseover')
				{
					// stop_s();
					// stop_bar();
					// inner_controll_p();
				}else if (event.type=='mouseleave')
				{
					// start_s();
					// startbar();
					// inner_controll_s();
				}
			});
			$('.thumnail').on('click mouseover mouseout', function(event){
				if (event.type=='click')
				{
					// setTimeout(stop_bar,0);
					// setTimeout(stop_s,0);
					sort_index = $(this).data('index');
					move=(sort_index-1)*-100;
					thumnail_on();
					bullet_on();
					// page();
					$('.slide-container').stop().animate({'left':move+'%'},movespeed);
					// setTimeout(startbar,0);
					// setTimeout(start_s,0);
				}
				else if (event.type=='mouseover')
				{
					// stop_s();
					// stop_bar();
					// inner_controll_p();
				}else if (event.type=='mouseout')
				{
					// stop_s();
					// stop_bar();
					// start_s();
					// startbar();
					// inner_controll_s();
				}
			});

			function lazy_0(){
				if($('.slide-wrap').height()==0){
					$(document).ready(function(){
						// if ($('body').width>720){
						// 	msheight = $('.slide').children('video').height()+100;
						// }
						// else{
						// 	msheight = '100vh';
						// }
						msheight = $('.slide').children('video').height()+100;
						article_height = $('.article').height();
						$('.slide-wrap').css({'height':msheight,'max-height':article_height});
						// console.log(msheight+' --')
						}
					);
				};
			}
			function startbar(){
				setTimeout(lazy_0,0);
				if($('.slide-wrap').find('.controll').length<1){
					$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
					$('.timebar').stop().animate({'width':'100%'},barspeed);
					bar_on = setInterval(function(){
							$('.timebar').remove();
							$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
							$('.timebar').stop().animate({'width':'100%'},barspeed);
					},autospeed);
				}else{
					if($('.controll input[type=checkbox]').prop('checked')==false){
						$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
						$('.timebar').stop().animate({'width':'100%'},barspeed);
						bar_on = setInterval(function(){
								$('.timebar').remove();
								$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
								$('.timebar').stop().animate({'width':'100%'},barspeed);
						},autospeed);
					}
				}
			};
			function page(){
				if($('.slide-wrap').find('.pagecount').length<1){
					$('.slide-wrap').append('<div class="pagecount" style="position:absolute;top:0;right:0;width:60px;height:30px;line-height:30px;background:rgba(0,0,0,0.7);color:#fff;font-size:14px;z-index:4;"><span style="display:block;width:100%;text-align:center;">'+sort_index+' / '+slideNum+'</span></div>')
				}
				else{
					$('.pagecount').children('span').text(sort_index+' / '+slideNum);
				}
			};
			function bullet_on(){
				$('.bulet').css({'color':'#ccc'});
				$('.bulet'+sort_index).css({'color':'#999'});
				video_pause();
			};
			function thumnail_on(){
				$('.thumnail').children('img').css({'border':'2px solid #000'});
				$('.thumnail'+sort_index).children('img').css({'border':'2px solid #ccc'});
				video_pause();
			};
			function click_snd(){
				var clickSnd = new Audio();
				clickSnd.src = "media/t_btn_click.mp3";
				clickSnd.load();
				clickSnd.play();
			};
			function controll(){
				var controll_right;
				if($('.slide-wrap').find('.pagecount')){
					controll_right=60;
				}else{
					controll_right=0;
				}
				if($('.slide-wrap').find('.controll').length<1){
					$('.slide-wrap').append('<div class="controll" style="position:absolute;top:0;right:'+controll_right+'px;width:60px;height:30px;line-height:30px;background:rgba(0,0,0,0.7);color:#fff;font-size:14px;z-index:4;">\
					<input type="checkbox" id="controll_btn" name="controll_btn"><label for="controll_btn"><span class="btn_word" style="display:block;width:100%;text-align:center;cursor:pointer;">Stop</span></label></div>')
				}
				$('.controll input[type=checkbox]').click(function(){
					if ($(this).prop('checked')==true)
					{
						$('.controll label').children('span').text('Play');
						// stop_s();
						// stop_bar();
					}else{
						$('.controll label').children('span').text('Stop');
						// start_s();
						// startbar();
					}
					click_snd();
				});
			};
			//-----------------현재 비 활성화 중으로 현재의 auto slide 상태를 바로 확인하고 싶을 때는 start_s()와 startbar()안의 if문을 일반 실행 형태로 바꾸고 inner_controll_s()/inner_controll_p() 활성화 할 것.
			function inner_controll_s(){
				$('.controll input[type=checkbox]').prop('checked',false);
				$('.controll label').children('span').text('Stop');
			};
			function inner_controll_p(){
				$('.controll input[type=checkbox]').prop('checked',true);
				$('.controll label').children('span').text('Play');
			};
			//----------------------------------------------------------------------------------------------
			function click_move(){
				video_controll();
			};
			function video_pause(){
				$('.article_5').find('.slide').children('video').trigger('pause');
			};
			function video_controll(){
				if($('.article_5').find('.slide'+sort_index).children(this).prop('paused')){
					$('.article_5').find('.slide'+sort_index).children(this).trigger('play');
				}else{
					$('.article_5').find('.slide'+sort_index).children(this).trigger('pause');
				}
			};
			function start_s(){
				setTimeout(lazy_0,0);
				stop_next();
				if($('.slide-wrap').find('.controll').length<1){
					slide_on = setInterval(function(){
						nextBtn();
					},autospeed);
				}else{
					if($('.controll input[type=checkbox]').prop('checked')==false){
						slide_on = setInterval(function(){
							nextBtn();
						},autospeed);
					}
				}
			};
			// start_s();
			// startbar();
			function stop_s(){
				clearInterval(slide_on);
			};
			function stop_bar(){
				$('.timebar').remove();
				clearInterval(bar_on);
			};
		});
	};
	return false;
});
