function addQuestion()
{
var title = $('#title').val();
var ques = $("#ques").val();
	$.ajax({
               url : '/user/addQuestion',
                type:'POST',
                data:{title:title,ques:ques},
                dataType:'html',   
                success:function(data){
		location.reload(); 
		             
                  }
            });
}
function showimagepreview(input) 
		{
		
			if (input.files && input.files[0]) 
			{
				var filerdr = new FileReader();
				filerdr.onload = function(e) 
				{
					$('#imgprvw').attr('src', e.target.result);
				}
				filerdr.readAsDataURL(input.files[0]);
			}
			}
