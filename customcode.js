var HATA_MESAJLARI = [];
var maxPhotoSize = 5242880;
var errorMsg = "";

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
			var imgURL = '<img src="https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+fileKey+'">';
			return imgURL
		}
		
		function makeInput() {
			var i;
			var adet = $('*[data-default^="fotoUpload"]').lenght;
			for (i=1;i<adet;i++) {
				$('#CustomForm').append('<input type="file" id="fotoUpload'+i+'" class="fotoyukleinput" accept="image/*"><label for="fotoUpload'+i+'" id="fLabel'+i+'" class="uploadButton"><i class="fas fa-camera uploadicon"></i>'+i+'. Fotoğraf Yükle</label>');
			}
		}
		
$(function(){
	
	$('.fotoyukleinput').change(function(){
		
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
			var mailAdres = MEMBER_INFO['MAIL'];
			var urunID = PRODUCT_DATA[0]['id'];
			var photoKey = mailAdres+"/"+urunID+"/"+random + "_" + fileName;
			
			var upload = new AWS.S3.ManagedUpload({
				params: {
					Bucket: bucketName,
					Key: photoKey,
					Body: file
				}
			});
			
			var inputID = this.id;
			$('#'+inputID).prop( "disabled", true );
			$('label[for='+inputID+']').removeClass()
			$('label[for='+inputID+']').addClass('uploadButton');			
			$('label[for='+inputID+']').html('<i class="fas fa-spinner fa-pulse uploadicon"></i>Dosya Yükleniyor...');	
			
			var promise = upload.promise();
			
			promise.then(
				function(data) {
					$('label[for='+inputID+']').html('<i class="fas fa-check uploadicon"></i>Fotoğraf yüklendi.');
					$('*[data-default="'+inputID+'"]').attr("src", getPhoto(photoKey));
				},
				function(err) {
					$('#'+inputID).prop( "disabled", false );
					$('label[for='+inputID+']').html('<i class="fas fa-times uploadicon"></i>Yükleme başarısız.');
					$('label[for='+inputID+']').removeClass()
					$('label[for='+inputID+']').addClass('errUpload');
					return alert("Fotoğraf yüklenirken bir sorun oluştu: ", err.message);
				}
			);
		}
	});
});
