import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

//TODO: make sure that we are testing different number of max guesses
//TODO: Test to make sure we are not able to re-enter an inputted letter

/**  Takes in letter and container, a helper function to click button. */

function clickButton(container, ltr) {
  return fireEvent.click(container.querySelector(`button[value="${ltr}"]`));
}

describe("game stops at max guesses", function () {
  test("should show image after max wrong guesses", function () {
    const { container } = render(
      <Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
        words={["apple"]}
        maxWrong={6} />
    );

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");
    clickButton(container, "d");
    clickButton(container, "c");

    const img = container.querySelector("img");
    expect(img.getAttribute("src"))
      .toEqual("6.png");

  });

  test("letter buttons are gone after max wrong guesses", function () {
    const { container } = render(
      <Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
        words={["apple"]}
        maxWrong={6} />
    );

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");
    clickButton(container, "d");
    clickButton(container, "c");
    //TODO: add a test before buttons are clicked where we see that the button existed before

    expect(container.querySelector("button")).not.toContainHTML("value='a'");
    expect(container.querySelector("button")).toHaveClass("Snowman-restart");
  });

  test("message You lose shows after max wrong guesses", function () {
    const { container } = render(
      <Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
        words={["apple"]}
        maxWrong={6} />
    );

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
    const { container } = render(
      <Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
        words={["apple"]}
        maxWrong={6} />
    );

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");
    clickButton(container, "d");
    clickButton(container, "c");

    expect(container).toMatchSnapshot();
  });
});

//TODO: play with mocking the answer