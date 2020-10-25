// Loads contents first then tells the site what to do after a button is clicked
document.addEventListener('DOMContentLoaded',
function(){
  document.getElementById("start").onclick =()=>{
    get_api_data('https://my-json-server.typicode.com/sguthrie16/Technica-Hackathon/Questions_Quiz')
    };
})
count = 0;
question_type = "";
current_question_one = "";
current_question_two ="";
number_of_questions_one = 0;
number_of_questions_two = 0;

data = "";
current_score =0;
question_id_one = 0;
question_id_two = 0;
answer ="";


// Async await - Getting data from quiz
  let get_api_data = async (api_endpoint) =>{
    results = await fetch(api_endpoint);
    data = await results.json()
      document.getElementById("quiz1").style.display = 'block';
      document.getElementById("start").style.display ="none";
      current_question_one = data[count];
      number_of_questions_one = Object.keys(data).length;
      this.question_id_one = current_question_one.id;
      this.answer = current_question_one.correct_answers;
      document.getElementById("quiz_answer").innerHTML="";
    generate_quiz_one();
}




function generate_quiz_one(){
    document.getElementById("quiz1").innerHTML = `
    <form>
    <h2>${current_question_one.question}</h2>
      <input type="radio" value = ${current_question_one.options.optiona} name = ${current_question_one.options.optiona} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optiona}> ${current_question_one.options.optiona}</label><br>
      <input type="radio" value = ${current_question_one.options.optionb} name = ${current_question_one.options.optionb} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optionb}>${current_question_one.options.optionb}</label><br>
      <input type="radio" value = ${current_question_one.options.optionc} name = ${current_question_one.options.optionc} onclick= "score_tracker(this.value)">
      <label for=${current_question_one.options.optionc}> ${current_question_one.options.optionc}</label><br>
      <input type="radio" value = ${current_question_one.options.optiond} name=${current_question_one.options.optiond} onclick= "score_tracker(this.value)">
      <label>${current_question_one.options.optiond}</label><br>
    </form>`
  return false;
}


function score_tracker(selected_answer){
  if (answer == selected_answer) {
      current_score = current_score + 1;
        }
    count = count +1;
    document.getElementById("quiz_answer").innerHTML = `<h4 style="color:white;">The answer is the one that starts with ${answer} </h4>`;
  if(count == number_of_questions_one){
    complete();
    return false;
  }
  setTimeout(()=>{
      get_api_data('https://my-json-server.typicode.com/sguthrie16/Technica-Hackathon/Questions_Quiz');
  }, 1000);
return false;
}
function complete(){
  document.getElementById("quiz1").style.display ="none";
  document.getElementById("quiz_answer").style.display="none"
  document.getElementById("completion").innerHTML= `<h1 style="color:white"> Your score is ${(current_score*100)/number_of_questions_one}`;
}
