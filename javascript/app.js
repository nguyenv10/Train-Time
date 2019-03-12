var time_sign="Pm";
var total_min_now = 0;
var total_min_train =0;
var away=0;
var table_body = $("#tbody");

var playersRef = firebase.database().ref().child("/");


/*
playersRef.push ({

    Name:"Quetta Express",
    Destination:"Quetta",
    Frequency:25,
    "Firsttrain":"5:30",

});

playersRef.push ({

    Name:"Jafer Express",
    Destination:"Islamabad",
    Frequency:15,
    "Firsttrain":"6:30",

});
*/



function setData()
{



    var firebase_ref = firebase.database().ref().child("/");

    firebase_ref.on('value', snap=>{

        snap.forEach(function(childSnapshot){


            var key = childSnapshot.key;

            var childData = childSnapshot.val();

            var the_time = childData['Firsttrain'];

            military_to_standard(the_time);


            if(total_min_train < total_min_now)
            {



                while(total_min_train <= total_min_now)
                {

                    total_min_train+= (childData['Frequency']*1);


                }




                away = total_min_train - total_min_now;

            }


            total_min_train/=60;


            total_min_train = total_min_train.toString();
            
            
            var final_array = total_min_train.split(".");
            var final_mins;
            if(final_array[1] != null)
            {
               

                total_min_train = total_min_train*1;



                final_mins = total_min_train - (final_array[0]*1);
               
                /*final_mins = final_array[1]/10;*/

                final_mins = final_mins*60;
                final_mins = final_mins.toFixed(2);

            }
            else
            {
                final_mins=0;
            }

            

           
            table_body.append("<tr><td>"+childData['Name']+"</td><td>"+childData['Destination']+"</td><td>"+childData['Frequency']+"</td><td>"+final_array[0]+":"+final_mins+" "+time_sign+"</td><td>"+away.toFixed(3)+"</td></tr>");


        });






    });


}

setData();




$("#form").submit(function(e){

    e.preventDefault();


    var name = $("#name").val();
    var dest = $("#dest").val();
    var time = $("#time").val();
    var freq = $("#freq").val();



    var firebase_ref = firebase.database().ref();

    firebase_ref.push ({

        Name:name,
        Destination:dest,
        Frequency:freq,
        "Firsttrain":time,

    });




});



function military_to_standard(time)
{
    var hours = time.split(":");

    if(hours[0] == 13)
    {
        calculations(1,hours[1],"Pm");
    }
    else if(hours[0] == 14)
    {
        calculations(2,hours[1],"Pm");
    }
    else if(hours[0] == 15)
    {
        calculations(3,hours[1],"Pm");
    }
    else if(hours[0] == 16)
    {
        calculations(4,hours[1],"Pm");
    }
    else if(hours[0] == 17)
    {
        calculations(5,hours[1],"Pm");
    }
    else if(hours[0] == 18)
    {
        calculations(6,hours[1],"Pm");
    }
    else if(hours[0] == 19)
    {
        calculations(7,hours[1],"Pm");
    }
    else if(hours[0] == 20)
    {
        calculations(8,hours[1],"Pm");
    }
    else if(hours[0] == 21)
    {
        calculations(9,hours[1],"Pm");
    }
    else if(hours[0] == 22)
    {
        calculations(10,hours[1],"Pm");
    }
    else if(hours[0] == 23)
    {
        calculations(11,hours[1],"Pm");
    }
    else if(hours[0] == 24)
    {
        calculations(12,hours[1],"Pm");
    }
    else
    {
        return hours[0];
        time_sign="Am";

    }

}

function calculations(value_hours,value_minutes,sign)
{
    total_min_train = (value_hours*60)+(value_minutes*1);

    var current_time = new Date();

    var current_hour = current_time.getHours();

    var current_minute = current_time.getMinutes();



    if(current_hour  == 13)
    {
        current_hour = 1;
    }
    else if(current_hour == 14)
    {
        current_hour = 2;
    }
    else if(current_hour == 15)
    {
        current_hour = 3;
    }
    else if(current_hour == 16)
    {
        current_hour = 4;
    }
    else if(current_hour == 17)
    {
        current_hour = 5;
    }
    else if(current_hour == 18)
    {
        current_hour = 6;
    }
    else if(current_hour == 19)
    {
        current_hour = 7;
    }
    else if(current_hour == 20)
    {
        current_hour = 8;
    }
    else if(current_hour == 21)
    {
        current_hour = 9;
    }
    else if(current_hour == 22)
    {
        current_hour = 10;
    }
    else if(current_hour == 23)
    {
        current_hour = 11;
    }
    else if(current_hour == 24)
    {
        current_hour = 12;
    }

    total_min_now = (current_hour*60)+(current_minute*1);



}
