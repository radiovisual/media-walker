import { SubtitleButtonProps } from "./subtitle-button.types";

function SubTitleButton(props: SubtitleButtonProps) {
  const { onSubtitleClick, subtitle } = props;

  return (
    <div>
      <button className="w-full" onClick={() => onSubtitleClick(subtitle)}>
        <div className="">
          <p className="py-1 text-sm font-medium text-gray-200 dark:text-white">
            {subtitle.text}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {subtitle.timestamp}
          </p>
        </div>
      </button>
    </div>
  );
}

export { SubTitleButton };
