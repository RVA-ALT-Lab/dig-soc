var myCalendar = createCalendar({
  options: {
    //class: 'my-class',
    
    // You can pass an ID. If you don't, one will be generated for you
    id: 'event-date'
  },
  data: {
    // Event title
    title: 'Echoes of White Nationalism, Past, Present and Into The Digital Future',

    // Event start date
    start: new Date('March 28, 2018 19:00'),
    

    // You can also choose to set an end time
    // If an end time is set, this will take precedence over duration
    end: new Date('March 28, 2018 20:00'),     

    // Event Address
    address: 'Academic Learning Commons Room 1100, 1000 Floyd Avenue, Richmond, VA',

    // Event Description
    description: 'On Wednesday, March 28, the VCU chapter of the AKD Sociology Honor Society is hosting a public lecture by Dr. Jessie Daniels, professor of sociology at the City University of New York (CUNY) and an internationally recognized expert on internet racism. She will be discussing the internet and white supremacy and their role in the current political moment. The event is free and open to the public.'
  }
});

document.querySelector('#the-date').appendChild(myCalendar);



//twitter avatars
var avatars = document.getElementsByClassName('twitter-avatar');
console.log(avatars);
for (var i = 0; i < avatars.length; i++ ){
    var theAvatar = avatars[i];
    var twitterName = theAvatar.nextSibling.innerHTML;    
    theAvatar.style.backgroundImage = 'url(https://twitter.com/' + twitterName + '/profile_image?size=bigger)';
}

//https://twitter.com/jessienyc/profile_image?size=original