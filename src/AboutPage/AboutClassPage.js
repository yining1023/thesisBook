import React from 'react'
// import {html} from './aboutClassindex.md'
import classphoto from '../img/classphoto.jpg'
import s from './styles.css'

export const AboutClassPage = () => {
  return (
    // {/*<div dangerouslySetInnerHTML={{ __html: html }} />*/}

    <div className={s.poem}>
      <img className={s.classPhoto} src={classphoto} alt={"ITP Thesis 2017"} />
      <p>TO THE CLASS OF 2017: <br/><br/>
      You’re whimsical, witty, obsessed and serious<br/>
      Outrageous, political, playful and curious,<br/>
      Rigorous, hard-working, goofy and thoughtful,<br/>
      Faced with a world, to put it mildly, distraught-ful.<br/>
      The collection of projects you produced this semester:<br/>
      Imaginative, mind-blowing, you deserve a siesta…<br/>
      For now I’ll offer a few illustrations…<br/>
      From Behavior Change to Museums, Installations,<br/>
      Music, Performance, Data, UI and UX<br/>
      (Though this year’s there’s really not much about sex)<br/>
      A few about gender, we’re not total prigs:<br/>
      Menstruation, Black beauty, drag–thermochromic wigs,<br/>
      Shirts that will bite you if you tell me to smile,<br/>
      Chatbots to organize, to converse with a child,<br/>
      A place to get away––a safe house or under a dome––<br/>
      Tales from far away, and some close to home.<br/>
      Games–economic, scientific and video...<br/>
      A place to ask questions like you did as a kiddio<br/>
      And no matter how much we tried to dissuade<br/>
      Of Virtual Reality there’s a virtual parade:<br/>
      Memories and stories, trips to places you can’t go:<br/>
      The heart, back in time, a storm, fly like a pro.<br/>
      Educational, poetic, sometimes subversive<br/>
      360, AR,––interactive, immersive:<br/>
      Deployment and dragons,Taiwan, Standing Rock<br/>
      And several that ask us all to take stock:<br/>
      Is tech making us safer? It’s worth an unveiling<br/>
      To see what google, facebook et al are surveilling.<br/>
      Write your name in the sand in arabic script,<br/>
      Visit Trinidad, South America, India without taking a trip.<br/>
      You’ve built stuff in metal, wood, with light and in tubes<br/>
      With Algorithms, Unity, and 3 billion cubes.<br/>
      No thesis is needed (though we have one) to forecast your fortune<br/>
      Of brains, smarts, and kindness you’ve got a huge portion.<br/>
      Your futures are bright: You’re brave. And you’re strong.<br/>
      I could go on, but this poem’s a bit long.<br/>
      2017’s a prime number--like you,special and rare.<br/>
      Now Thesis is over. It’s time for a cheer!</p>


    </div>
  )
}
