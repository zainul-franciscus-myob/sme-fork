import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';

import ImageViewer, { isElementContained } from '../ImageViewer';

const clickableImageClass = 'clickableImage';
const imageViewerClass = 'imageViewer';
const imageViewerCloseClass = 'imageViewer__close';

let container;
describe('ImageViewer', () => {
  describe('component', () => {
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
      container = null;
    });

    it('renders a clickable image', () => {
      act(() => {
        ReactDOM.render(<ImageViewer mediaSrc="src" title="title" />, container);
      });
      const clickableImage = container.getElementsByClassName(clickableImageClass);
      expect(clickableImage).toHaveLength(1);
    });

    it('opens viewer on image click', () => {
      act(() => {
        ReactDOM.render(<ImageViewer mediaSrc="src" title="title" />, container);
      });
      const clickableImage = container.getElementsByClassName(clickableImageClass);
      const clickableImageButton = clickableImage[0];
      ReactTestUtils.Simulate.click(clickableImageButton);

      const imageViewer = document.getElementsByClassName(imageViewerClass);
      expect(imageViewer).toHaveLength(1);

      const imageViewerCloseButton = document.getElementsByClassName(
        imageViewerCloseClass,
      );
      expect(imageViewerCloseButton).toHaveLength(1);
    });

    it('closes viewer on viewer click', () => {
      act(() => {
        ReactDOM.render(<ImageViewer mediaSrc="src" title="title" />, container);
      });
      const clickableImage = container.getElementsByClassName(clickableImageClass);
      const clickableImageButton = clickableImage[0];
      ReactTestUtils.Simulate.click(clickableImageButton);

      const imageViewerCloseButton = document.getElementsByClassName(
        imageViewerCloseClass,
      );
      ReactTestUtils.Simulate.click(imageViewerCloseButton[0]);

      const imageViewer = document.getElementsByClassName(imageViewerClass);
      expect(imageViewer).toHaveLength(0);
    });

    it('closes viewer on pressing escape', () => {
      act(() => {
        ReactDOM.render(<ImageViewer mediaSrc="src" title="title" />, container);
      });
      const clickableImageButton = container.getElementsByClassName(
        clickableImageClass,
      )[0];
      ReactTestUtils.Simulate.click(clickableImageButton);

      const imageViewerCloseButton = document.getElementsByClassName(
        imageViewerCloseClass,
      )[0];
      ReactTestUtils.Simulate.keyDown(imageViewerCloseButton, {
        key: 'Escape',
      });

      const imageViewer = document.getElementsByClassName(imageViewerClass);
      expect(imageViewer).toHaveLength(0);
    });

    it('should still focus on pressing tab', () => {
      act(() => {
        ReactDOM.render(<ImageViewer mediaSrc="src" title="title" />, container);
      });

      const clickableImageButton = container.getElementsByClassName(
        clickableImageClass,
      )[0];
      ReactTestUtils.Simulate.click(clickableImageButton);

      const imageViewerCloseButton = document.getElementsByClassName(
        imageViewerCloseClass,
      )[0];
      ReactTestUtils.Simulate.keyDown(imageViewerCloseButton, {
        key: 'Tab',
      });

      const imageViewer = document.getElementsByClassName(imageViewerCloseClass)[0];
      const focusedElement = document.activeElement;
      expect(imageViewer).toBe(focusedElement);
    });
  });

  describe('isElementContained', () => {
    it('should return true if element height is contained within container', () => {
      const widthRatio = 0.8;
      const containerHeight = 100;
      const containerWidth = 100;
      const naturalHeight = 100;
      const naturalWidth = 100;
      expect(
        isElementContained({
          widthRatio,
          containerHeight,
          containerWidth,
          naturalWidth,
          naturalHeight,
        }),
      ).toBeTruthy();
    });

    it('should return false if element height exceeds container', () => {
      const widthRatio = 0.8;
      const containerHeight = 100;
      const containerWidth = 100;
      const naturalHeight = 150;
      const naturalWidth = 80;
      expect(
        isElementContained({
          widthRatio,
          containerHeight,
          containerWidth,
          naturalWidth,
          naturalHeight,
        }),
      ).toBeFalsy();
    });
  });
});
