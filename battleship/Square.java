package battleship;

public class Square {
	private boolean firedOn;
	private boolean shipHere;

	public Square() {
		this.firedOn = false;
		this.shipHere = false;
	}

	public Square(boolean firedOn, boolean shipHere) {
		this.firedOn = firedOn;
		this.shipHere = shipHere;
	}

	public boolean isFiredOn() {
		return firedOn;
	}

	public void setFiredOn(boolean firedOn) {
		this.firedOn = firedOn;
	}

	public boolean isShipHere() {
		return shipHere;
	}

	public void setShipHere(boolean shipHere) {
		this.shipHere = shipHere;
	}

}
