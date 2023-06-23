import "./loader.scss"
export enum E_Size{
	small="small",
	medium="medium",
	large="lagre"
}
export type T_LoaderProps={
		size:"small"|"medium"|"lagre";
}

const classNameMap = {
  [E_Size.small]: "scale-[30%]",
  [E_Size.medium]: "scale-50",
  [E_Size.large]: "scale-100",
};

const Loader = (props:T_LoaderProps) => {
		const scaleClassName = classNameMap[props?.size] || classNameMap[E_Size.large]
	return (<div aria-label="Orange and tan hamster running in a metal wheel" role="img" className={`wheel-and-hamster ${scaleClassName}`}>
		<div className="wheel"></div>
		<div className="hamster">
			<div className="hamster__body">
				<div className="hamster__head">
					<div className="hamster__ear"></div>
					<div className="hamster__eye"></div>
					<div className="hamster__nose"></div>
				</div>
				<div className="hamster__limb hamster__limb--fr"></div>
				<div className="hamster__limb hamster__limb--fl"></div>
				<div className="hamster__limb hamster__limb--br"></div>
				<div className="hamster__limb hamster__limb--bl"></div>
				<div className="hamster__tail"></div>
			</div>
		</div>
		<div className="spoke"></div>
	</div>)
}

export default Loader;
