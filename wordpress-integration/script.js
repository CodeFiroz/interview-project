function timeAgo(inputDate) {
  const seconds = Math.floor((new Date() - new Date(inputDate)) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let unit in intervals) {
    const interval = Math.floor(seconds / intervals[unit]);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return "just now";
}


async function fetchPost() {
    const apiURL = `https://wordpress.org/news/wp-json/wp/v2/posts`;

    let postSection = document.querySelector(".post-grid");

    postSection.innerHTML = "";
    
    try {
        const postRes = await fetch(apiURL).then(res => res.json());
        console.log(postRes);
        
        postRes.slice(0,3).map((post)=>{
            postSection.innerHTML += `
            <div class="w-full p-5 bg-zinc-50 border border-zinc-100 shadow-sm">

            <h4>
            <a href="${post.link}" class="hover:text-blue-500">${post.title.rendered}</a>
            </h4>
            <p class="text-zinc-400 text-xs">${timeAgo(post.date)}</p>
                
                    <div class="text-xs py-4 text-gray-500">
                        ${post.excerpt.rendered}
                    </div>

                    <a href="${post.link}" class="text-xs text-blue-500 hover:text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer duration-300">
                        read more
                    </a>
                

            </div>
            `
        })

    } catch (err) {

        alert("Something went wrong")
        console.log(err);

    }
}

fetchPost();