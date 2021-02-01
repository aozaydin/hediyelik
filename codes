var HATA_MESAJLARI = [];
var maxPhotoSize = 5242880;
var errorMsg = "";

	$('body').on('click', '.uploadarea', function() {
		var inputID = $(this).attr('data-uploadarea');
		$('#'+inputID).trigger('click');
	});

        function fileTypeValidation(fileName) { 

			var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.PNG|\.JPEG|\.JPG)$/i;
			
            if (!allowedExtensions.exec(fileName)) {  
				HATA_MESAJLARI.push("Lütfen geçerli bir fotoğraf dosyası yükleyiniz. İzin verilenler (.JPG, .JPEG, .PNG)");
                return false; 
            }  
            else  
            { 
				return true
            } 
        }
		
		function fileCount(filesLength) { 
		 
			if (!filesLength) {
				HATA_MESAJLARI.push("Lütfen yüklenecek en az bir fotoğraf seçiniz.");
				return false;
			}
			else {
				return true;
			}
        }
		
		function fileSizeValidation(size) {
			if(size > maxPhotoSize) {
				HATA_MESAJLARI.push("En fazla 5 MB boyutunda fotoğraf yükleyebilirsiniz.");
				return false;
			}
			else {
				return true;
			}
		}
		
		function fileValidation(filesLength, fileName, fileSize) {
			if(!fileCount(filesLength) || !fileTypeValidation(fileName) || !fileSizeValidation(fileSize) || HATA_MESAJLARI.length>0){
				return false;
			}
			else {
				return true;
			}
		}
			
		function getPhoto(fileKey) {
			var imgURL = 'https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+fileKey;
			return imgURL;
		}
		
		function checkform(param) {
		    var i;
		    var hata;
		    var adet = $('*[data-default^="fotoUpload"]').length;
		    if( adet > 0 ) {
		        for(i=0; i<=adet; i++) {
		            if ( $('*[data-default="fotoUpload'+i+'"]').html() == "" ) {
		                hata = true;
		            }
		        }
		        
		        if( hata == true ) {
		            alert("Lütfen tüm fotoğrafları yükleyiniz.");
		        }
		        else
		        {
		           if (!param) {
		            Add2Cart({$P.ID}, $('#subPro{$P.ID}').val(), $('.detayAdet{$P.ID}').val());
		           }
		           else {
		            Add2Cart({$P.ID}, $('#subPro{$P.ID}').val(), $('.detayAdet{$P.ID}').val(), param);
		           }
		        }
		    }
		    else {
		           if (!param) {
		            Add2Cart({$P.ID}, $('#subPro{$P.ID}').val(), $('.detayAdet{$P.ID}').val());
		           }
		           else {
		            Add2Cart({$P.ID}, $('#subPro{$P.ID}').val(), $('.detayAdet{$P.ID}').val(), param);
		           }
		    }
		}
		
$(function(){
	
		$('body').on('change', '.fotoyukleinput', function() {
		
    		var files = this.files;
    		var file = files[0];
    		var fileName = file.name;
    		var fileSize = file.size;
    		var filesLength = files.length;
    		
    		if (!fileValidation(filesLength, fileName, fileSize)) {
    			var i;
    			for (i=0; HATA_MESAJLARI.length>i; i++) {
    				errorMsg = errorMsg + HATA_MESAJLARI[i]+"\n";
    				alert(errorMsg);
    			}
    			HATA_MESAJLARI = [];
    			errorMsg = "";
    		}
    		else {
    			var rnd = Math.random().toString();
    			var random = rnd.substring(2);
    			var d = Date.now();
    			var mailAdres = MEMBER_INFO['MAIL'];
    			var urunID = PRODUCT_DATA[0]['id'];
    			var photoKey = mailAdres + "/" + urunID + "/" + d + "_" + random + "_" + fileName;
    			
    			var upload = new AWS.S3.ManagedUpload({
    				params: {
    					Bucket: bucketName,
    					Key: photoKey,
    					Body: file
    				}
    			});
    			
    			var inputID = this.id;
    			$('#'+inputID).prop( "disabled", true );		
    			$('div[data-imgarea="'+inputID+'"]').html('<div id="uploading"><i class="fas fa-spinner fa-pulse uploadicon"></i><p style="font-size:12px;">Fotoğraf Yükleniyor</p></div>');	
        			
    			var promise = upload.promise();
    			
    			promise.then(
    				function(data) {
    			    	$('#'+inputID).prop( "disabled", false );
    					$('*[data-default="'+inputID+'"]').html(getPhoto(photoKey));
    					$('div[data-imgarea="'+inputID+'"]').next().html('Değiştir');
    					$('div[data-imgarea="'+inputID+'"]').next().removeClass('uploadbasla uploaderror').addClass('uploadbitis');
    					var container = 'div[data-imgarea="'+inputID+'"]';
            				var reader = new FileReader(); 
            				reader.onload = function (e) { 
            					$(''+container).html('<img src="'+e.target.result+'" width="150" />'); 
            				}
            				reader.readAsDataURL(file); 
    				},
    				function(err) {
    					$('#'+inputID).prop( "disabled", false );
    					$('div[data-imgarea="'+inputID+'"]').html('<div id="uploading" style="background: #000; color:#fff;"><i class="fas fa-times uploadicon"></i><p style="font-size:12px;">Yükleme Başarısız</p></div>');
    					$('div[data-imgarea="'+inputID+'"]').next().html('Tekrar Deneyin');
    					$('div[data-imgarea="'+inputID+'"]').next().removeClass('uploadbasla uploadbitis').addClass('uploaderror');
    					return alert("Fotoğraf yüklenirken bir sorun oluştu: ", err.message);
    				}
    			);
		    }
	});
});
