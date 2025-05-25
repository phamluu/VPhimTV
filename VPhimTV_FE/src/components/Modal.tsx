import { forwardRef } from 'react';

interface ButtonProps {
    text?: string;
    show?: boolean;
    width?: string;
    color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "soft";
    size?: "sm" | "md" | "lg";
    onClick?: () => void | Promise<void>;
}
interface ModalProps {
    title?: string;
    btnShow?: boolean;
    className?: string;
    children?: React.ReactNode;
    iconClose?: boolean;
    btnOk?: ButtonProps;
    btnCancel?: ButtonProps;
    allowBtnCloseModal?: boolean;
    backdropClose?: boolean;
}

const ConfirmClassMap = {
    color: { primary: "btn-primary", secondary: "btn-secondary", accent: "btn-accent", info: "btn-info", success: "btn-success", warning: "btn-warning", error: "btn-error", soft: "btn-soft" },
    size: { sm: "btn-sm", md: "btn-md", lg: "btn-lg" },
    titlePosition: { left: "text-left", center: "text-center", right: "text-right" }
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
    ({
        title,
        children,
        btnShow = true,
        className,
        iconClose = false,
        btnOk,
        btnCancel,
        allowBtnCloseModal = true,
        backdropClose = false
    }, ref) => {
        return (
            <dialog ref={ref} className={`modal ${className}`}>
                <div className="modal-box p-4">
                    {iconClose && (
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    )}
                    <h3 className="text-lg font-bold">{title}</h3>
                    <div className="py-4">{children}</div>
                    {btnShow && (
                        <div className="modal-action mt-0">
                            {renderButtons({ allowBtnCloseModal, btnCancel, btnOk })}
                        </div>
                    )}
                </div>
                {backdropClose && (
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                )}
            </dialog>
        );
    }
);

const renderButtons = ({ allowBtnCloseModal, btnCancel, btnOk }: ModalProps) => {
    const Wrapper = allowBtnCloseModal ? "form" : "div";
    const wrapperProps = allowBtnCloseModal ? { method: "dialog", className: "flex gap-3" } : { className: "flex gap-3" };

    return (
        <Wrapper {...wrapperProps}>
            {btnCancel?.show !== false && (
                <button
                    className={`btn ${ConfirmClassMap.color[btnCancel?.color || "soft"]} ${ConfirmClassMap.size[btnCancel?.size || ""]}`}
                    style={{ width: btnCancel?.width || "90px" }}
                    onClick={btnCancel?.onClick}
                >
                    {btnCancel?.text || "Cancel"}
                </button>
            )}
            {btnOk?.show !== false && (
                <button
                    className={`btn ${ConfirmClassMap.color[btnOk?.color || "primary"]} ${ConfirmClassMap.size[btnOk?.size || ""]}`}
                    style={{ width: btnOk?.width || "90px" }}
                    onClick={btnOk?.onClick}
                >
                    {btnOk?.text || "OK"}
                </button>
            )}
        </Wrapper>
    );
};

export default Modal;
export { ConfirmClassMap };
export type { ModalProps };
