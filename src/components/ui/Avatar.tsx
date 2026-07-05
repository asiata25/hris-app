import { cn } from "@/lib/cn";
import { getInitials, getAvatarBg } from "@/utils/helpers";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  name,
  src,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-xs",
    lg: "w-12 h-12 text-sm",
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold border tracking-wider select-none shrink-0 transition-transform hover:scale-105",
        sizes[size],
        getAvatarBg(name),
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
