package battleship;

public class Grid {
	private Square[][] squareMatrix;

	public Grid() {
		this.squareMatrix = new Square[5][5];
		for (int row = 0; row < 5; row++) {
			for (int col = 0; col < 5; col++) {
				squareMatrix[row][col] = new Square();
			}
		}
	}

	public boolean isShipAt(int row, int col) {
		return (squareMatrix[row][col].isShipHere());
	}

	public void placeHorizontalShip(int startRow, int startCol, int shipLength) {
		for (int col = startCol; col < startCol + shipLength; col++) {
			addShipPartAt(startRow, col);
		}
	}

	public void placeVerticalShip(int startRow, int startCol, int shipLength) {
		for (int row = startRow; row < startRow + shipLength; row++) {
			addShipPartAt(row, startCol);
		}
	}

	public void addShipPartAt(int row, int col) {
		squareMatrix[row][col].setShipHere(true);
	}
}
