package battleship;

import javax.swing.BoxLayout;
import javax.swing.JFrame;

public class BattleshipGame extends JFrame {

	private static final long serialVersionUID = 1L;
	private Grid player1Grid;
	private Grid player2Grid;

	private static final String GAME_TITLE = "Battleship";
	private static final int FRAME_WIDTH = 300;
	private static final int FRAME_HEIGHT = 750;

	public static void main(String[] args) {
		new BattleshipGame();
	}

	public BattleshipGame() {
		initializeFrame();
		initializeGrids();
		drawGrids();
		beginFiringRounds();
		setVisible(true);
	}

	private void initializeFrame() {
		getContentPane().setLayout(new BoxLayout(getContentPane(), BoxLayout.PAGE_AXIS));
		setSize(FRAME_WIDTH, FRAME_HEIGHT);
		setTitle(GAME_TITLE);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public void initializeGrids() {
		player1Grid = new Grid();
		player2Grid = new Grid();

		player1Grid.placeHorizontalShip(0, 0, 3);
		player1Grid.placeVerticalShip(2, 0, 2);
		player1Grid.placeHorizontalShip(3, 3, 1);
		player2Grid.placeHorizontalShip(3, 3, 2);
		player2Grid.placeVerticalShip(1, 0, 4);
		player2Grid.placeHorizontalShip(1, 2, 1);
	}

	public void drawGrids() {
		GridPanel player1GridPanel = new GridPanel(this, player1Grid);
		GridPanel player2GridPanel = new GridPanel(this, player2Grid);
		add(player1GridPanel);
		add(player2GridPanel);
	}

	public void beginFiringRounds() {

	}

}
