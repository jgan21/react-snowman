import React from "react";
import { render, fireEvent } from "@testing-library/react";
import * as words from "./words";

words.randomWord = jest.fn();

import Snowman from "./Snowman";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";


/**  Takes in letter and container, a helper function to click button. */

function clickButton(container, ltr) {
  return fireEvent.click(container.querySelector(`button[value="${ltr}"]`));
}

describe("buttons are deactivated after being clicked", function() {
  test("should not be able to click button twice in a row", function() {
    words.randomWord.mockReturnValueOnce("berry");
    const { container } = render(
      <Snowman images={[img0, img1, img2, img3, img5, img6]}
        words={["apple", "berry", "hairy"]}
        maxWrong={5} />
    );
    expect(container.querySelector(`button[value="k"]`))
      .not
      .toContainHTML("disabled");

    clickButton(container, "k");

    expect(container.querySelector(`button[value="k"]`))
      .toContainHTML("disabled");
  })
})

describe("game stops at max guesses", function () {

  test("should show image after max wrong guesses", function () {
    words.randomWord.mockReturnValueOnce("apple");
    const { container } = render(
      <Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
        words={["apple", "berry"]}
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
    words.randomWord.mockReturnValueOnce("apple");
    const { container } = render(
      <Snowman images={[img0, img1, img2, img3, img4, img5, img6]}
        words={["apple"]}
        maxWrong={6} />
    );

    expect(container.querySelector("button")).toContainHTML('value="a"');

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");
    clickButton(container, "d");
    clickButton(container, "c");

    expect(container.querySelector("button")).not.toContainHTML('value="a"');
    expect(container.querySelector("button")).toHaveClass("Snowman-restart");
  });

  test("message You lose shows after max wrong guesses", function () {
    words.randomWord.mockReturnValueOnce("berry");
    const { container } = render(
      <Snowman images={[img0, img1, img3, img5, img6]}
        words={["apple", "berry", "hairy", "lower", "lemur"]}
        maxWrong={4} />
    );

    clickButton(container, "k");
    clickButton(container, "m");
    clickButton(container, "n");
    clickButton(container, "o");

    expect(container).toContainHTML("You lose");
    expect(container.querySelector(".Snowman-word")).toContainHTML("berry");

  });

});

describe("snapshot", function () {
  test("matches snapshot", function () {
    words.randomWord.mockReturnValueOnce("apple");
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