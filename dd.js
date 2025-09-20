const movies=[];
const users=[];
const reviews=[];


function findMovieById(id)
{
    return movies.find(movie=>movie.id===id);
}
function finduserById(id)
{
    return users.find(user=>user.id===id);
}   

function addMovie(title,year,genres,description,cast)
{
const movie={
    id:movies.length+1,
    title,
    year,
    genres,
    description,
    cast
};
movies.push(movie);
return movie;
}

function addUser(name,email,password)
{
    const user={
        id:users.length+1,
        name,   
        email,
        password,
        watchlist:[]
    };
    users.push(user);
    return user;

}

function addReview(movieId,userId,rating,comment)
{
    const user =finduserById(userId);
    const movie=findMovieById(movieId);
    if(!user || !movie)
    {
        throw new Error("Invalid user or movie ID");
    }
    const review={
        id:reviews.length+1,
        movieId,
        userId,
        rating,
        comment,
        date:new Date()
    };
    reviews.push(review);
    return review;

    
}

function viewMovieDetails(movieId)
{
    const movie=findMovieById(movieId);
    if(!movie)
    {
        throw new Error("Movie not found");
    }
   
    console.log(`Title: ${movie.title}`);
    console.log(`Year: ${movie.year}`);
    console.log(`Genres: ${movie.genres.join(", ")}`);
    console.log(`Description: ${movie.description}`);
    console.log(`Cast: ${movie.cast.join(", ")}`);
    const movieReviews=reviews.filter(review=>review.movieId===movieId);
    if(movieReviews.length===0)
    {
        console.log("No reviews yet.");
    }
    else
    {
        console.log("Reviews:");        
        movieReviews.forEach(review=>{
            const user=finduserById(review.userId);
            console.log(`- ${user.name} (${review.rating}/5): ${review.comment} [${review.date.toLocaleDateString()}]`);
        });
    }
}

function recommendMovies(userId)
{
    const user=finduserById(userId);
    if(!user)
    {
        throw new Error("User not found");
    }
const watchgenres= user.watchlist.flatMap(mid=>findMovieById(mid)?.genres||[]);
const recommended=movies.filter(movie=>
    !user.watchlist.includes(movie.id) &&
    movie.genres.some(genre=>watchgenres.includes(genre))
);
if(recommended.length===0)
{
    console.log("No recommendations available.");
}
else
{
    console.log("Recommended Movies:");
    recommended.forEach(movie=>{
        console.log(`- ${movie.title} (${movie.year})`);
    }
    );
}
}
// Demo Usage
const user1=addUser("hala","hala@gmail,com","password123");
const user2=addUser("ahmed","ahmed@gmail,com","password456");

const movie1=addMovie("Inception",2010,["Action","Sci-Fi"],"A thief who steals corporate secrets through the use of dream-sharing technology.","Leonardo DiCaprio, Joseph Gordon-Levitt");
const movie2=addMovie("The Dark Knight",2008,["Action","Crime"],"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.","Christian Bale, Heath Ledger");

addReview(movie1.id,user1.id,5,"Amazing movie with a mind-bending plot!");
addReview(movie2.id,user2.id,4,"Great performances and a thrilling story.");


user1.watchlist.push(movie1.id);
user1.watchlist.push(movie2.id);
viewMovieDetails(movie1.id);

recommendMovies(user1.id);
