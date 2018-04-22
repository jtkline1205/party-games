package battleship;

import java.awt.Color;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JPanel;

public class GridPanel extends JPanel implements ActionListener {

	private static final long serialVersionUID = 1L;

	@SuppressWarnings("unused")
	private BattleshipGame parent;

	// private JButton[] buttonArray;

	public GridPanel(BattleshipGame parent, Grid grid) {
		this.parent = parent;
		setBackground(Color.BLACK);
		setLayout(new GridLayout(5, 5));
		// generateRackButtons(rackToGenerate, teamColor);
		Color color = Color.BLUE;
		this.setLayout(new GridLayout(5, 5));
		for (int row = 0; row < 5; row++) {
			for (int col = 0; col < 5; col++) {
				JButton button = new JButton();
				button.addActionListener(this);
				if (grid.isShipAt(row, col)) {
					color = Color.GRAY;
				} else {
					color = Color.BLUE;
				}
				button.setBackground(color);
				button.setOpaque(true);
				add(button);
				// JLabel label = new JLabel();
				// if (grid.isShipAt(row, col)) {
				// color = Color.GRAY;
				// } else {
				// color = Color.BLUE;
				// }
				// label.setBackground(color);
				// label.setOpaque(true);
				// label.setBorder(new EmptyBorder(0, 10, 0, 0));
				// add(label);
			}
		}
	}

	@Override
	public void actionPerformed(ActionEvent event) {
		JButton buttonPressed = ((JButton) event.getSource());
		buttonPressed.setBackground(Color.RED);
		// String buttonNumber = (buttonPressed).getText();
		// if (myParent.getIslandMode()) {
		// myParent.setIslandMode(false);
		// myParent.getTeamUp().processMake(buttonNumber, false);
		// } else {
		// myParent.getTeamUp().processMake(buttonNumber, true);
		// if (myParent.getTeamUp().getPlayerUp().getCurrentStreak() < 3) {
		// myParent.getTeamUp().switchShooter();
		// myParent.setRoundOver(myParent.getTeamUp().turnIsOver());
		// }
		// myParent.enableMissButton();
		// }
		// myParent.updateGame();
	}

}
