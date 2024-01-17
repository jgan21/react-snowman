import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";


function clickButton(ltr){
  return fireEvent.click(container.querySelector(`button[value="${ltr}"]`))

}

// make sure the image is there
// make sure the buttons are gone
// make sure the message shows = "You lose" and the correct word
describe("works: game stops at max guesses", function(){
  test("should show image after max wrong guesses", function(){
    const { container } = render(<Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
      words={["apple"]}
      maxWrong={6}/>);
  })

    clickButton("k")
    clickButton("m")
    clickButton("n")
    clickButton("o")
    clickButton("d")
    clickButton("c")

})