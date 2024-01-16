import React from "react";
import { render, fireEvent, debug } from "@testing-library/react";
import Snowman from "./Snowman";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";


function clickButton(container, ltr) {
  return fireEvent.click(container.querySelector(`button[value="${ltr}"]`));

}

// make sure the image is there
// make sure the buttons are gone
// make sure the message shows = "You lose" and the correct word
describe("works: game stops at max guesses", function () {
  test("should show image after max wrong guesses", function () {
    const { container } = render(<Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
      words={["apple"]}
      maxWrong={6} />);

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");
    clickButton(container, "d");
    clickButton(container, "c");
    // clickButton(container, "q");

    expect(container).toContainHTML("<img src");

    const img = container.querySelector("img");
    expect(img.getAttribute("src"))
      .toEqual("6.png");

  });

  test("makes sure the buttons are gone after max wrong guesses", function () {
    const { container } = render(<Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
      words={["apple"]}
      maxWrong={6} />);

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");
    clickButton(container, "d");
    clickButton(container, "c");

    expect(container.querySelector("button")).toBeNull();

  });

  test("makes sure the message You lose shows after max wrong guesses", function () {
    const { container } = render(<Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
      words={["apple"]}
      maxWrong={6} />);

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");
    clickButton(container, "d");
    clickButton(container, "c");

    expect(container).toContainHTML("You lose");
    expect(container.querySelector(".Snowman-word")).toContainHTML("apple");

  });



});

describe("snapshot", function () {
  test("matches snapshot", function () {
    const { container } = render(<Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
      words={["apple"]}
      maxWrong={6} />);

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");
    clickButton(container, "d");
    clickButton(container, "c");

    expect(container).toMatchSnapshot();
  });
});