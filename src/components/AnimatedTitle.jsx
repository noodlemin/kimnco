import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';

const AnimatedTitle = ({ title, containerClass }) => {
  // The 'ref' is what we attach to the element to observe.
  // 'inView' is a boolean that will be true when the element is in the viewport.
  const { ref, inView } = useInView({
    // --- Configuration Options ---
    threshold: 0.2,    // Trigger the animation when 20% of the element is visible.
    triggerOnce: true, // Ensure the animation only runs once.
    // rootMargin can be useful for debugging if you suspect viewport issues.
    // For example: rootMargin: '-100px 0px -100px 0px'
  });

  // This variable will ensure each word has a unique index for its delay.
  let wordIndex = 0;

  return (
    <>
      {/* We are moving the styles into a <style> tag to ensure they are applied
          and to make them highly specific to avoid conflicts with other CSS.
          Using a unique class like `title-container-for-animation` helps.
      */}
      <style>{`
        /* Initial state for each word: hidden and positioned down */
        .word-to-animate {
          display: inline-block; /* Important for transform to work correctly */
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        /* The state when the container is in view: revealed and in position */
        .title-container-for-animation.is-in-view .word-to-animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* The main container div. We attach the ref here. */}
      <div
        ref={ref}
        // We use a unique, specific class and add 'is-in-view' when `inView` is true.
        className={clsx(
          "title-container-for-animation",
          containerClass,
          { 'is-in-view': inView }
        )}
      >
        {/* We map over each line of the title */}
        {title.split("<br />").map((line, lineIdx) => (
          <div
            key={lineIdx}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          >
            {/* We map over each word in the line */}
            {line.split(" ").map((word, wIdx) => {
              const currentWordIndex = wordIndex++;
              return (
                <span
                  key={`${lineIdx}-${wIdx}`}
                  className="word-to-animate"
                  // The staggered delay is applied directly via an inline style
                  // to ensure each word animates sequentially.
                  style={{ transitionDelay: `${currentWordIndex * 0.05}s` }}
                  dangerouslySetInnerHTML={{ __html: word }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimatedTitle;